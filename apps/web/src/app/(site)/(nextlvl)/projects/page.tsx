import styles from "./page.module.css";
import { ProjectItem } from "./components/ProjectItem/ProjectItem";
import { IProject } from "@repo/interfaces";
import { Combobox } from "./components/Combobox/Combobox";
import InputWithIcon from "./components/SearchInput/SearchInput";
const project: IProject = {
  id: 1,
  name: "Зерносушильный комплекс в Смоленской области",
  description:
    "Разработка проекта для строительства зерносушильного комплекса.",
  price: 2342423,
  area: 234234,
  images: ["http://localhost:3002/images/maini.webp"],
  client: "",
  workStructure: "",
  sector: "dsafasdfsa",
  service: "dasfsadfa",
  term: "",
};

export default function Projects() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="text-2xl font-bold text-primary">Наши проекты</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <InputWithIcon placeholder={"Поиск проекта"} className="w-[100%]" />
          <Combobox />
        </div>
      </div>
      <div className={"grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}>
        <ProjectItem project={project}></ProjectItem>
        <ProjectItem project={project}></ProjectItem>
        <ProjectItem project={project}></ProjectItem>
        <ProjectItem project={project}></ProjectItem>
        <ProjectItem project={project}></ProjectItem>
        <ProjectItem project={project}></ProjectItem>
      </div>
    </div>
  );
}
