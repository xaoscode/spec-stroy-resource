"use client";
import { Project } from "./components/Project/Project";
import { IProject } from "@repo/interfaces";

export function OurProjects({ projects }: { projects: IProject[] }) {


  return (
    <div className="grid grid-cols-1 gap-8 max-w-[1070px] p-5">
      { projects.length > 0 ? (
        projects.map((el: IProject, i: number) => (
          <Project key={ i } project={ el } index={ i } />
        ))
      ) : (
        <div className="text-center text-gray-500">
          <p>Проекты не найдены</p>
        </div>
      ) }
    </div>
  );
}
