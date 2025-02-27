"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./HomeMap.module.css";
import cn from "classnames";
import { HomeMapProps } from "./HomeMap.props";
import Link from "next/link";

export default function HomeMap({
  className,
  ...props
}: HomeMapProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 8);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const items = [
    {
      className: styles["item-1"],
      text: "Строительно-техническая экспертиза жилья",
      image: "/plan.svg",
      url: "/services/stroy"
    },
    {
      className: styles["item-2"],
      text: "Многоквартирные жилые дома и административные здания",
      image: "/apart.svg",
      url: "/projects?page=1&sector=apartment&sector=administrative"
    },
    {
      className: styles["item-3"],
      text: "Промышленные объекты: заводы и фабрики.",
      image: "/factory.svg",
      url: "/projects?page=1&sector=industrial"
    },
    {
      className: styles["item-4"],
      text: "Образовательные и медицинские учреждения",
      image: "/school.svg",
      url: "/projects?page=1&sector=educational"

    },
    {
      className: styles["item-5"],
      text: "Логистические центры и склады.",
      image: "/storage.svg",
      url: "/projects?page=1&sector=logistics"
    },
    {
      className: styles["item-6"], text: "Малоэтажное строительство", image: "/rec.svg",
      url: "/projects?page=1&sector=reconstruction"

    },
    {
      className: styles["item-7"], text: "BIM-проектирование", image: "/bim.svg",
      url: "/services/bim"

    },
    {
      className: styles["item-8"], text: "Проектирование инженерных систем и сетей", image: "/ing.svg",
      url: "/services/engineering"

    },
  ];

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  return (
    <div className={ cn(styles.map__container, className) } { ...props }>
      <div className={ styles.octagon }></div>
      { items.map((item, index) => (
        <Link
          key={ index }
          className={ cn(item.className, styles.item, {
            [styles.active]: index === activeIndex,
          }) }
          onMouseEnter={ handleMouseEnter }
          href={ item.url }
        >
          <span>{ item.text }</span>
          <Image
            src={ item.image }
            alt={ `Векторное изображение ${item.text.toLowerCase()}` }
            width={ 1 }
            height={ 1 }
          />
        </Link>
      )) }
    </div>
  );
}
