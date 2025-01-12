import { PaginationMod } from "@/app/(site)/(nextlvl)/components/PaginationMod/PaginationMod";
import { Combobox } from "@/app/(site)/(nextlvl)/projects/components/Combobox/Combobox";
import { fetchProjectsCout } from "@/app/(site)/api/Projects";
import Search from "@/components/Search/Search";
import { Suspense } from "react";
import ProjectsTable from "@/app/(site)/(nextlvl)/projects/components/Table/Table";

export default async function AdminProjects(props: {
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
        <ProjectsTable filters={ filters } currentPage={ currentPage } currentPath={ "/admin/panel/projects" } />
      </Suspense>

      <PaginationMod
        totalPages={ Math.ceil(totalPages / 9) }
      />
    </div>
  );
}