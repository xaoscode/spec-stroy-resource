import Call from "./components/Call/Call";
import styles from "./page.module.css";
import InfoBlock from "./components/InfoBlock/InfoBlock";
import { OurProjects } from "../../components/OurProjects/OurProjects";
import { Metadata } from "next";
import HomeMap from "./components/HomeMap/HomeMap";
import ServiceBlock from "@/components/ServiceBlock/ServiceBlock";
import { Button } from "@/components/Button/Button";
import { getFiveLatestProjects } from "./api/Projects";
import Link from "next/link";

export const metadata: Metadata = { title: "Главная" };



export default async function Home() {
  const projects = await getFiveLatestProjects()


  return (
    <div className={ styles.wrapper }>
      <div className={ styles.home__header }>
        <div className={ styles.header__text }>ПРОЕКТ - ОСНОВА НАДЕЖНОСТИ</div>
        <HomeMap />
      </div>

      <InfoBlock className={ styles.services }>
        <div className={ styles.header }>УСЛУГИ</div>
        <ServiceBlock />
      </InfoBlock>
      <div className={ styles.consult }>
        <Call className={ styles.call } />
      </div>
      <InfoBlock className={ styles.projects }>
        <div className={ styles.header }>НАШИ ПРОЕКТЫ</div>

        <OurProjects projects={ projects } />

        <Button size="lg" variant="filled" className="mx-5">
          <Link href="/projects">Все проекты</Link>
        </Button>
      </InfoBlock>
    </div>
  );
}
