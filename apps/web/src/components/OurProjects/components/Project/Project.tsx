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
        <div className="flex flex-col gap-10">
          <div className="text-2xl sm:text-3xl text-primary font-medium">
            {project.name}
          </div>
          <p className="text-sm sm:text-base">{project.description}</p>
        </div>
        <div className={styles.priceArea}>
          <div className="flex flex-col">
            <div className="text-base sm:text-xl text-black">Площадь:</div>
            <div className="text-2xl sm:text-3xl text-primary font-bold">
              {project.area}
              <span> м²</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-base sm:text-xl text-black">
              Стоимость проектирования:
            </div>
            <div className="text-2xl sm:text-3xl text-primary font-bold">
              {Intl.NumberFormat("ru-RU").format(project.price)}
              <span> ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
