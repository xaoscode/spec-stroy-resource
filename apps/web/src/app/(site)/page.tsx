import Call from "./components/Call/Call";
import styles from "./page.module.css";
import InfoBlock from "./components/InfoBlock/InfoBlock";
import { OurProjects } from "../../components/OurProjects/OurProjects";
import { Metadata } from "next";
import HomeMap from "./components/HomeMap/HomeMap";
import ServiceBlock from "@/components/ServiceBlock/ServiceBlock";
import { IProject } from "@repo/interfaces";

export const metadata: Metadata = { title: "Главная" };
const projects: IProject[] = [
  {
    id: 1,
    name: "Разработка проектно-сметной документации для реконструкции объекта «Участок формирования конфет и выстойки пастилы в производственном цехе»",
    description:
      "Разработка проектно-сметной документации для реконструкции объекта «Участок формирования конфет и выстойки пастилы в производственном цехе». Цель проекта: Разработка проектной документации для реконструкции объекта и получения разрешения на строительство.",
    price: 23423423,
    area: 324234,
    images: [
      "http://localhost:3002/images/maini.webp",
      "http://localhost:3002/images/maini.webp",
      "http://localhost:3002/images/maini.webp",
      "http://localhost:3002/images/maini.webp",
    ],
  },
  {
    id: 2,
    name: "Разработка проектно-сметной документации для реконструкции объекта «Участок формирования конфет и выстойки пастилы в производственном цехе»",
    description:
      "Разработка проектно-сметной документации для реконструкции объекта «Участок формирования конфет и выстойки пастилы в производственном цехе». Цель проекта: Разработка проектной документации для реконструкции объекта и получения разрешения на строительство.",
    price: 23423423,
    area: 324234,
    images: [
      "http://localhost:3002/images/maini.webp",
      "http://localhost:3002/images/maini.webp",
      "http://localhost:3002/images/maini.webp",
      "http://localhost:3002/images/maini.webp",
    ],
  },
];
export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.home__header}>
        <div className={styles.header__text}>ПРОЕКТ - ОСНОВА НАДЕЖНОСТИ</div>
        <HomeMap />
      </div>

      <InfoBlock className={styles.services}>
        <div className={styles.header}>УСЛУГИ</div>
        <ServiceBlock />
      </InfoBlock>
      <div className={styles.consult}>
        <Call className={styles.call} />
      </div>
      <InfoBlock className={styles.projects}>
        <div className={styles.header}>НАШИ ПРОЕКТЫ</div>
        <OurProjects projects={projects} />
      </InfoBlock>
    </div>
  );
}
