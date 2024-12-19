import { OurProjects } from "@/components/OurProjects/OurProjects";
import { IProject } from "@repo/interfaces";

const projects: IProject[] = [
  {
    id: 1,
    name: "Разработка проектно-сметной документации для реконструкции объекта «Участок формирования конфет и выстойки пастилы в производственном цехе»",
    description:
      "Разработка проектно-сметной документации для реконструкции объекта «Участок формирования конфет и выстойки пастилы в производственном цехе». Цель проекта: Разработка проектной документации для реконструкции объекта и получения разрешения на строительство.",
    price: 23423423,
    area: 324234,
    images: [
      "http://localhost:3002/images/maini.webp",
      "http://localhost:3002/images/maini.webp",
      "http://localhost:3002/images/maini.webp",
      "http://localhost:3002/images/maini.webp",
    ],
  },
  {
    id: 2,
    name: "Разработка проектно-сметной документации для реконструкции объекта «Участок формирования конфет и выстойки пастилы в производственном цехе»",
    description:
      "Разработка проектно-сметной документации для реконструкции объекта «Участок формирования конфет и выстойки пастилы в производственном цехе». Цель проекта: Разработка проектной документации для реконструкции объекта и получения разрешения на строительство.",
    price: 23423423,
    area: 324234,
    images: [
      "http://localhost:3002/images/maini.webp",
      "http://localhost:3002/images/maini.webp",
      "http://localhost:3002/images/maini.webp",
      "http://localhost:3002/images/maini.webp",
    ],
  },
];
export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-1 gap-5">
      <div>{children}</div>
      <div className="space-y-6 p-6 bg-gray-50 rounded-lg shadow-md">
        <div
          className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-primary
"
        >
          Примеры
        </div>
        <OurProjects projects={projects}></OurProjects>
      </div>
    </div>
  );
}
