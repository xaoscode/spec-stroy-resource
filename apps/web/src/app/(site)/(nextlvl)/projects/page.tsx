import { Input } from "@/components/inputs/PhoneInput/PhoneInput";
import styles from "./page.module.css";
import Image from "next/image";
import { ProjectItem } from "./components/ProjectItem/ProjectItem";
import { IProject } from "@repo/interfaces";
const project: IProject = {
  id: 1,
  name: "Зерносушильный комплекс в Смоленской области",
  description:
    "Разработка проекта для строительства зерносушильного комплекса.",
  price: 2342423,
  area: 234234,
  images: ["http://localhost:3002/images/maini.webp"],
};

export default function Projects() {
  return (
    <div className={styles.projects__wrapper}>
      <div className={styles.projects__header}>
        <div className={styles.text__header}>Наши проекты</div>
        <div className={styles.actions}>
          <div className={styles.input__group}>
            <Input
              id="search"
              className={styles.input}
              placeholder="Введите название объкта"
            ></Input>
            <label className={styles.label} htmlFor={"search"}>
              <Image
                src={"/search.svg"}
                alt={"иконка поиска"}
                width={30}
                height={30}
              />
            </label>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <ProjectItem project={project}></ProjectItem>
        <ProjectItem project={project}></ProjectItem>
        <ProjectItem project={project}></ProjectItem>
        <ProjectItem project={project}></ProjectItem>
        <ProjectItem project={project}></ProjectItem>
        <ProjectItem project={project}></ProjectItem>
      </div>
    </div>
  );
}
