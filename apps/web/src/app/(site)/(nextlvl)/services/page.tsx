import Link from "next/link";
import styles from "./page.module.css";
const services = [
  {
    title: "Инструментально техническое обследование",
    url: "/services/instrumentalno-tekhnicheskoe-obsledovanie",
  },
];
export default function Services() {
  return (
    <div className={styles.projects__wrapper}>
      {services.map((item, index) => (
        <div key={index}>
          <Link href={item.url}>{item.title}</Link>
        </div>
      ))}
    </div>
  );
}
