"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProjectItem } from "./components/ProjectItem/ProjectItem";
import { Combobox } from "./components/Combobox/Combobox";
import InputWithIcon from "./components/SearchInput/SearchInput";
import { getFilteredProjects } from "../../api/Projects";
import { IProject } from "@repo/interfaces";
import { PaginationMod } from "../components/PaginationMod/PaginationMod";

export default function Projects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [total, setTotal] = useState(0);
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  );
  const [service, setService] = useState(searchParams.get("service") || "");
  const [sector, setSector] = useState(searchParams.get("sector") || "");

  const fetchProjects = async (
    page: number,
    service?: string,
    sector?: string,
  ) => {
    const { projects, total } = await getFilteredProjects(
      page,
      9,
      service,
      sector,
    );
    setProjects(projects);
    setTotal(total);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    window.history.pushState(null, "", url.toString());
  };

  const handleFilterChange = (
    filterType: "service" | "sector",
    value: string,
  ) => {
    if (filterType === "service") setService(value);
    if (filterType === "sector") setSector(value);

    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set(filterType, value);
    } else {
      url.searchParams.delete(filterType);
    }
    url.searchParams.delete("page"); // Сбрасываем пагинацию
    window.history.pushState(null, "", url.toString());
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchProjects(currentPage, service, sector);
  }, [currentPage, service, sector]);

  useEffect(() => {
    const urlPage = Number(searchParams.get("page")) || 1;
    const urlService = searchParams.get("service") || "";
    const urlSector = searchParams.get("sector") || "";

    if (urlPage !== currentPage) setCurrentPage(urlPage);
    if (urlService !== service) setService(urlService);
    if (urlSector !== sector) setSector(urlSector);
  }, [searchParams, currentPage, service, sector]);

  return (
    <div className="grid grid-cols-1 gap-5">
      {/* Заголовок и фильтры */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="text-2xl font-bold text-primary">Наши проекты</div>
        {/* Фильтры */}
        <div className="flex flex-col justify-end gap-4 lg:flex-row">
          <InputWithIcon placeholder={"Поиск проекта"} className="w-full" />
          <Combobox
            onComboChange={(value) => handleFilterChange("sector", value)}
          />
        </div>
      </div>

      {/* Список проектов */}
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project: IProject) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>

      {/* Пагинация */}
      <PaginationMod
        totalPages={Math.ceil(total / 9)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
