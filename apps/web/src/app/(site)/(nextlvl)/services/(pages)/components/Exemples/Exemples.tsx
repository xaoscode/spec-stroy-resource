import { Exemple } from "./components/Exemple/Exemple";
import { IProject } from "@repo/interfaces";
import styles from "./OurProjects.module.css";
import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

interface ExemplesProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  projects: IProject[];
}
export function Exemples({ projects }: ExemplesProps) {
  return (
    <div className={styles.projects}>
      {projects.map((el: IProject, i: number) => (
        <Exemple key={i} project={el} index={i} />
      ))}
    </div>
  );
}
