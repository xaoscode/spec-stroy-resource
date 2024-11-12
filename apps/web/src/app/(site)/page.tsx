import Block from "./components/Block/Block";
import Header from "./components/Header/Header";
import ServiceComponent from "./components/ServiceBlock/components/ServiceComponent/ServiceComponent";
import ServiceBlock from "./components/ServiceBlock/ServiceBlock";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={ styles.page }>
      <div className={ styles.main }>
        <Header></Header>
        <div className={ styles.info }>
          <Block></Block>
          <Block></Block>
          <Block ></Block>
        </div>
        <div className={ styles.services }>
          <ServiceBlock >
            <ServiceComponent header={ "Строительно-техническая экспертиза жилья" } image={ "/inspection.webp" }>

            </ServiceComponent>
            <ServiceComponent header={ "Инструментально техническое обследование объектов" } image={ "/instrumental.webp" }>

            </ServiceComponent>
            <ServiceComponent header={ "Строительно-техническая экспертиза жилья" } image={ "/inspection.webp" }>

            </ServiceComponent>
            <ServiceComponent header={ "Инструментально техническое обследование объектов" } image={ "/instrumental.webp" }>

            </ServiceComponent>

          </ServiceBlock>

        </div>
      </div>



    </div>
  );
}
