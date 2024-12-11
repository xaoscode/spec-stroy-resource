import Call from "./components/Call/Call";
import ServiceBlock from "./components/ServiceBlock/ServiceBlock";
import styles from "./page.module.css";
import InfoBlock from "./components/InfoBlock/InfoBlock";
import { OurProjects } from "./components/OurProjects/OurProjects";
import { Metadata } from "next";
import HomeMap from "./components/HomeMap/HomeMap";

export const metadata: Metadata = { title: "Главная" };

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.home__header}>
        <div className={styles.header__text}>ПРОЕКТ - ОСНОВА НАДЕЖНОСТИ</div>
        <HomeMap />
      </div>

      <InfoBlock className={styles.services}>
        <h2 className={styles.header}>УСЛУГИ</h2>
        <ServiceBlock />
      </InfoBlock>
      <div className={styles.consult}>
        <Call className={styles.call} />
      </div>
      <InfoBlock className={styles.projects}>
        <h2 className={styles.header}>НАШИ ПРОЕКТЫ</h2>
        <OurProjects />
      </InfoBlock>
    </div>
  );
}
