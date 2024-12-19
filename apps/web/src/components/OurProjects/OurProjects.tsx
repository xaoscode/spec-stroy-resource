import { Project } from "./components/Project/Project";
import { IProject } from "@repo/interfaces";
import styles from "./OurProjects.module.css";
import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

interface OurProjectsProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  projects: IProject[];
}
export function OurProjects({ projects }: OurProjectsProps) {
  return (
    <div className={styles.projects}>
      {projects.map((el: IProject, i: number) => (
        <Project key={i} project={el} index={i} />
      ))}
    </div>
  );
}
