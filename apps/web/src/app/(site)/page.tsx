
import { Button } from "@/components/Button/Button";
import Block from "./components/Block/Block";
import Call from "./components/Call/Call";
import Header from "./components/Header/Header";
import ServiceComponent from "./components/ServiceBlock/components/ServiceComponent/ServiceComponent";
import ServiceBlock from "./components/ServiceBlock/ServiceBlock";
import styles from "./page.module.css";
import Link from "next/link";
import PhoneIcon from '@/../public/phone.svg'
import MailIcon from '@/../public/mail.svg'
import { Dialog } from "./components/Dialog/Dialog";

export default function Home() {
  return (

    <div className={ styles.page }>
      <div className={ styles.main }>
        <Header></Header>
        <div className={ styles.info }>
          <Block>
            <Link href="tel:89966831963" passHref >
              <Button>
                <PhoneIcon />
                <span>8 996 683-19-63</span>
              </Button>
            </Link>
            <Link href="mailto:horny.bad.boy1337@gmail.com" passHref >
              <Button>
                <MailIcon />
                <span>horny.bad.boy1337@gmail.com</span>
              </Button>
            </Link>




          </Block>
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
      <Call className={ styles.call } />





    </div>
  );
}
