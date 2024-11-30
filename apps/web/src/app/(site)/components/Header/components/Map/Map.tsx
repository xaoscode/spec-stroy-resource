"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Map.module.css";
import cn from "classnames";
import { MapProps } from "./Map.props";
import Link from "next/link";

export default function Map({ className, ...props }: MapProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 6);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const items = [
    {
      className: styles.admin,
      text: "Административные здания.",
      image: "/admin.svg",
    },
    {
      className: styles.apart,
      text: "Многоквартирные жилые дома",
      image: "/apart.svg",
    },
    {
      className: styles.factory,
      text: "Промышленные объекты: заводы и фабрики.",
      image: "/factory.svg",
    },
    {
      className: styles.school,
      text: "Образовательные учреждения",
      image: "/school.svg",
    },
    {
      className: styles.storage,
      text: "Логистические центры и склады.",
      image: "/storage.svg",
    },
    { className: styles.rec, text: "Реконструкция", image: "/rec.svg" },
  ];
  const handleMouseEnter = () => {
    setIsPaused(true); // Включить паузу
  };

  return (
    <div className={cn(styles.map__container, className)} {...props}>
      {items.map((item, index) => (
        <Link
          key={index}
          className={cn(item.className, styles.item, {
            [styles.active]: index === activeIndex,
          })}
          onMouseEnter={handleMouseEnter}
          href={"/"}
        >
          <span>{item.text}</span>
          <Image
            src={item.image}
            alt={`Векторное изображение ${item.text.toLowerCase()}`}
            width={1}
            height={1}
          />
        </Link>
      ))}
    </div>
  );
}
