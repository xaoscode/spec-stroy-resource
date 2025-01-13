import { DetailedHTMLProps, HTMLAttributes } from "react";
import EmblaCarousel from "../EmblaCarousel/OurProjects.components";
import cn from "classnames";
import { IProject } from "@repo/interfaces";
import Link from "next/link";

interface ProjectProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  project: IProject;
  index: number;
}

export function Project({ index, project, className, ...props }: ProjectProps) {
  const isReversed = index % 2 !== 0;
  return (
    <div
      className={ cn(
        "flex flex-col lg:flex-row gap-8",
        {
          "lg:flex-row-reverse": isReversed,
        },
        className,
      ) }
      { ...props }
    >
      <div className={ cn({}) }>
        <EmblaCarousel slides={ project.images } />
      </div>

      <div className="flex flex-col gap-6 lg:w-2/3 justify-between">
        <div className="flex flex-col gap-4 ">
          <Link
            className="text-2xl  sm:text-3xl text-primary font-medium hover:underline"
            href={ `/projects/${project.id}` }
          >
            { project.name }
          </Link>
          <p className="text-sm text-justify sm:text-base text-gray-700 leading-relaxed">
            { project.description }
          </p>
        </div>

        <div className={ cn("flex flex-col", { "ml-auto": !isReversed }) }>
          <span className="text-base sm:text-lg text-gray-800">
            Стоимость проектирования:
          </span>
          <span className="text-2xl sm:text-3xl text-primary font-bold">
            { Intl.NumberFormat("ru-RU").format(project.price) }
            <span> ₽</span>
          </span>
        </div>
      </div>
    </div>

  );
}
