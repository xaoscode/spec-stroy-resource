"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Для работы с URL-параметрами
import { ProjectItem } from "./components/ProjectItem/ProjectItem";
import { Combobox } from "./components/Combobox/Combobox";
import InputWithIcon from "./components/SearchInput/SearchInput";
import { PaginationMod } from "./components/PaginationMod/PaginationMod";
import { getProjects } from "../../api/Projects";
import { IProject } from "@repo/interfaces";

export default function Projects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [total, setTotal] = useState(0);
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  );

  const fetchProjects = async (page: number) => {
    const { projects, total } = await getProjects(page, 9);
    setProjects(projects);
    setTotal(total);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    window.history.pushState(null, "", url.toString());
  };

  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const urlPage = Number(searchParams.get("page"));
    if (urlPage && urlPage !== currentPage) {
      setCurrentPage(urlPage);
    }
  }, [searchParams, currentPage]);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="text-2xl font-bold text-primary">Наши проекты</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <InputWithIcon placeholder={"Поиск проекта"} className="w-[100%]" />
          <Combobox />
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project: IProject) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>

      <PaginationMod
        totalPages={Math.ceil(total / 9)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
