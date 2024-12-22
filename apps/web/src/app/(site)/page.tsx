import Call from "./components/Call/Call";
import styles from "./page.module.css";
import InfoBlock from "./components/InfoBlock/InfoBlock";
import { OurProjects } from "../../components/OurProjects/OurProjects";
import { Metadata } from "next";
import HomeMap from "./components/HomeMap/HomeMap";
import ServiceBlock from "@/components/ServiceBlock/ServiceBlock";
import { Button } from "@/components/Button/Button";
import { fetchFilteredProjects, fetchProjectsCout } from "./api/Projects";

export const metadata: Metadata = { title: "Главная" };
const count = await fetchProjectsCout();
const projects = await fetchFilteredProjects(Math.ceil((count - 2) / 5), 5)

export default function Home() {
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
        <Button size="lg" variant="filled">
          Все проекты
        </Button>
      </InfoBlock>
    </div>
  );
}
