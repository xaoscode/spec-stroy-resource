import Call from "./components/Call/Call";
import ServiceBlock from "./components/ServiceBlock/ServiceBlock";
import styles from "./page.module.css";
import InfoBlock from "./components/InfoBlock/InfoBlock";
import { OurProjects } from "./components/OurProjects/OurProjects";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.home__header}>
        <h1 className={styles.header__text}>
          Подготовим для вас проектную документацию для строительства,
          гарантируя её соответствие требованиям экспертизы и успешное получение
          разрешения на строительство.
        </h1>
        <Map></Map>
      </div>

      <InfoBlock className={styles.services}>
        <h2 className={styles.header}>УСЛУГИ</h2>
        <ServiceBlock />
      </InfoBlock>
      <div className={styles.consult}>
        <Call className={styles.call} />
      </div>
      <div>
        <InfoBlock className={styles.projects}>
          <h2 className={styles.header}>НАШИ ПРОЕКТЫ</h2>
          <OurProjects />
        </InfoBlock>
      </div>
    </div>
  );
}
