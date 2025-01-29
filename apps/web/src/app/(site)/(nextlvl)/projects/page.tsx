
import Search from "@/components/Search/Search";
import { Suspense } from "react";
import ProjectsTable from "./components/Table/Table";
import { Combobox } from "./components/Combobox/Combobox";
import { PaginationMod } from "../components/PaginationMod/PaginationMod";
import { fetchProjectsCout } from "../../api/Projects";
import { Metadata } from "next";
import allMetadata from "../lib/metadata";

export const metadata: Metadata = { ...allMetadata.projects }

export default async function Projects(props: {
  searchParams?: Promise<{
    sector?: string;
    service?: string;
    search?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  const filters = {
    sector: searchParams?.sector || "",
    service: searchParams?.service || "",
    search: searchParams?.search || "",
    page: searchParams?.page || "",
  };

  const totalPages = await fetchProjectsCout(filters);

  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="text-2xl font-bold text-primary">Наши проекты</div>
        <div className="flex flex-col justify-end gap-4 lg:flex-row">
          <Search placeholder={ "Поиспк проектов..." } />
          <Combobox />
        </div>
      </div>

      <Suspense key={ JSON.stringify(filters) }>
        <ProjectsTable filters={ filters } currentPage={ currentPage } currentPath={ "/projects" } />
      </Suspense>

      <PaginationMod
        totalPages={ Math.ceil(totalPages / 9) }
      />
    </div>
  );
}
