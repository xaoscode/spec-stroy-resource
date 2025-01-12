import Call from "./components/Call/Call";
import styles from "./page.module.css";
import InfoBlock from "./components/InfoBlock/InfoBlock";
import { OurProjects } from "../../components/OurProjects/OurProjects";
import { Metadata } from "next";
import HomeMap from "./components/HomeMap/HomeMap";
import ServiceBlock from "@/components/ServiceBlock/ServiceBlock";
import { Button } from "@/components/Button/Button";
import { fetchFilteredProjects, fetchProjectsCout } from "./api/Projects";
import Link from "next/link";
import { IProject } from "@repo/interfaces";

export const metadata: Metadata = { title: "Главная" };



export default async function Home() {
  let projects: IProject[] = [];
  const count = await fetchProjectsCout();
  if (count > 0) {
    projects = await fetchFilteredProjects(Math.ceil(count / 5), 5);
  }

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
          <Link href="/projects">Все проекты</Link>
        </Button>
      </InfoBlock>
    </div>
  );
}
