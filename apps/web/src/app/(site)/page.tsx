import Block from "./components/Block/Block";
import Call from "./components/Call/Call";
import Header from "./components/Header/Header";
import ServiceComponent from "./components/ServiceBlock/components/ServiceComponent/ServiceComponent";
import ServiceBlock from "./components/ServiceBlock/ServiceBlock";
import styles from "./page.module.css";
import InfoBlock from "./components/InfoBlock/InfoBlock";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <Header></Header>
        <div className={styles.info}>
          <Block className={styles.govno}>
            <h1 className={styles.header__main}>
              Подготовим для вас проектную документацию для строительства,
              гарантируя её соответствие требованиям экспертизы и успешное
              получение разрешения на строительство.
            </h1>
          </Block>
        </div>
        <div className={styles.services}>
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
        </div>
      </div>
      <Call className={styles.call} />
      <InfoBlock>
        <h2 className={styles.header}>НАШИ ПРОЕКТЫ</h2>
      </InfoBlock>
    </div>
  );
}
