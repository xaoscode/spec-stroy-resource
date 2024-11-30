import Call from "./components/Call/Call";
import ServiceComponent from "./components/ServiceBlock/components/ServiceComponent/ServiceComponent";
import ServiceBlock from "./components/ServiceBlock/ServiceBlock";
import styles from "./page.module.css";
import InfoBlock from "./components/InfoBlock/InfoBlock";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <InfoBlock className={styles.services}>
        <h2 className={styles.header}>УСЛУГИ</h2>
        <ServiceBlock>
          <ServiceComponent
            header={"Строительно-техническая экспертиза жилья"}
            image={"/inspection.webp"}
          ></ServiceComponent>
          <ServiceComponent
            header={"Инструментально техническое обследование объектов"}
            image={"/instrumental.webp"}
          ></ServiceComponent>
          <ServiceComponent
            header={"Строительно-техническая экспертиза жилья"}
            image={"/inspection.webp"}
          ></ServiceComponent>
          <ServiceComponent
            header={"Инструментально техническое обследование объектов"}
            image={"/instrumental.webp"}
          ></ServiceComponent>
        </ServiceBlock>
      </InfoBlock>
      <div className={styles.consult}>
        <Call className={styles.call} />
      </div>
      <div>
        <InfoBlock className={styles.projects}>
          <h2 className={styles.header}>НАШИ ПРОЕКТЫ</h2>
        </InfoBlock>
      </div>
    </div>
  );
}
