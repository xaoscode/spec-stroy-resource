import { Project } from "./components/Project/Project";
import { IProject } from "@repo/interfaces";
import styles from "./OurProjects.module.css";
const projects: IProject[] = [
  {
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

export function OurProjects() {
  return (
    <div className={styles.projects}>
      {projects.map((el: IProject, i: number) => (
        <Project key={i} project={el} index={i} />
      ))}
    </div>
  );
}
