import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import styles from "./ProjectItem.module.css";
import Image from "next/image";
import Link from "next/link";
import { IProject } from "@repo/interfaces";
import cn from "classnames";

interface ProjectItemProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  project: IProject;
}

export function ProjectItem({
  project,
  className,
  ...props
}: ProjectItemProps) {
  return (
    <div
      className={cn(
        className,
        "flex flex-col space-y-6 p-6 bg-gray-50 rounded shadow-md hover:shadow-primary",
      )}
      {...props}
    >
      <div className="relative group">
        <Image
          className={styles.image}
          src={project.images[0]}
          alt={`Изображение ${project.name}`}
          width={300}
          height={300}
        />
        <div className="absolute inset-0  items-center justify-center bg-black bg-opacity-50 group-hover:flex hidden">
          <Link
            className="text-white text-center text-xl hover:underline"
            href={`/projects/${project.id}`}
          >
            {project.name}
          </Link>
        </div>
      </div>

      <div className={styles.content}>
        <Link
          className="text-primary font-bold text-justify text-xl hover:underline"
          href={`/projects/${project.id}`}
        >
          {project.name}
        </Link>

        <div className="grid grid-cols-[120px_1fr] gap-4 mt-4">
          <div className="font-light text-primary text-lg">Описание:</div>
          <div>{project.description}</div>

          <div className="font-light text-primary text-lg">Состав работ:</div>
          <div>{project.workStructure}</div>

          <div className="font-light text-primary text-lg">Заказчик:</div>
          <div>{project.client}</div>

          <div className="font-light text-primary text-lg">Площадь:</div>
          <div>{project.area}</div>

          <div className="font-light text-primary text-lg">Сумма:</div>
          <div>{project.price}</div>

          <div className="font-light text-primary text-lg">Срок:</div>
          <div>{project.term}</div>
        </div>
      </div>
    </div>
  );
}
