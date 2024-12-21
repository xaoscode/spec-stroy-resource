"use client";
import { useEffect, useState } from "react";
import { Project } from "./components/Project/Project";
import { IProject } from "@repo/interfaces";
import { usePathname } from "next/navigation";
// const projectss: IProject[] = [
//   {
//     id: 1,
//     name: "Разработка проектно-сметной документации для реконструкции объекта «Участок формирования конфет и выстойки пастилы в производственном цехе»",
//     description:
//       "Разработка проектно-сметной документации для реконструкции объекта «Участок формирования конфет и выстойки пастилы в производственном цехе». Цель проекта: Разработка проектной документации для реконструкции объекта и получения разрешения на строительство.",
//     price: 23423423,
//     area: 324234,
//     images: [
//       "http://localhost:3002/images/maini.webp",
//       "http://localhost:3002/images/maini.webp",
//       "http://localhost:3002/images/maini.webp",
//       "http://localhost:3002/images/maini.webp",
//     ],
//   },
//   {
//     id: 2,
//     name: "Разработка проектно-сметной документации для реконструкции объекта «Участок формирования конфет и выстойки пастилы в производственном цехе»",
//     description:
//       "Разработка проектно-сметной документации для реконструкции объекта «Участок формирования конфет и выстойки пастилы в производственном цехе». Цель проекта: Разработка проектной документации для реконструкции объекта и получения разрешения на строительство.",
//     price: 23423423,
//     area: 324234,
//     images: [
//       "http://localhost:3002/images/maini.webp",
//       "http://localhost:3002/images/maini.webp",
//       "http://localhost:3002/images/maini.webp",
//       "http://localhost:3002/images/maini.webp",
//     ],
//   },
// ];
export function OurProjects() {
  const [data, setData] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);
  const router = usePathname();
  const lastSegment = router.split("/").pop();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/services/api?current=${encodeURIComponent(lastSegment || "")}`,
        );
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        const data = await response.json();

        console.log(data);
        setData(data.data.projects);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lastSegment]);

  if (loading) return;
  if (error) return <div>Error: { error }</div>;

  return (
    <div className="grid grid-cols-1 gap-8 max-w-[1070px] p-5">
      { data.map((el: IProject, i: number) => (
        <Project key={ i } project={ el } index={ i } />
      )) }
    </div>
  );
}
