import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import styles from "./ProjectItem.module.css";
import Image from "next/image";
import Link from "next/link";
import { IProject } from "@repo/interfaces";
import cn from "classnames";
interface ProjectIntemProps
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
}: ProjectIntemProps) {
  return (
    <div className={cn(className, styles.project)} {...props}>
      <Image
        className={styles.image}
        src={project.images[0]}
        alt={""}
        width={300}
        height={300}
      />
      <div className={styles.content}>
        <Link className={styles.link} href={`/projects/${project.id}`}>
          {project.name}
        </Link>
        <div className={styles.text}>
          <span className={styles.title}>Цель: </span>
          {project.description}
        </div>
        <div className={styles.text}>
          <span className={styles.title}>Цель:</span>
        </div>
        <div className={styles.text}>
          <span className={styles.title}>Цель:</span>
        </div>
        <div className={styles.text}>
          <span className={styles.title}>Цель:</span>
        </div>
      </div>
    </div>
  );
}
