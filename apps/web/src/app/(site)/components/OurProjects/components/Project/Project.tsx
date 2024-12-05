import { DetailedHTMLProps, HTMLAttributes } from "react";
import EmblaCarousel from "../EmblaCarousel/OurProjects.components";
import styles from "./Project.module.css";
import cn from "classnames";
import { IProject } from "@repo/interfaces";
interface ProjectProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  project: IProject;
  index: number;
}
export function Project({ index, project, className, ...props }: ProjectProps) {
  return (
    <div
      className={cn(className, styles.project, {
        [styles.reverse]: index % 2 !== 0,
      })}
      {...props}
    >
      <EmblaCarousel slides={project.images} />
      <div className={styles.info}>
        <div className={styles.header}>{project.name}</div>
        <div className={styles.description}>{project.description}</div>
        <div className={styles.priceArea}>
          <div className={styles.subtitle}>
            <div className={styles.title}>Площадь:</div>
            <div>
              {project.area}
              <span> м²</span>
            </div>
          </div>
          <div className={styles.subtitle}>
            <div className={styles.title}>Стоимость проектирования:</div>
            <div>
              {Intl.NumberFormat("ru-RU").format(project.price)}
              <span> ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
