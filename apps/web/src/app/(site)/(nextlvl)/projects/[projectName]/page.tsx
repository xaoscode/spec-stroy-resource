import { getProject } from "@/app/(site)/api/Projects";
import EmblaCarousel from "@/components/OurProjects/components/EmblaCarousel/OurProjects.components";
import { IProject } from "@repo/interfaces";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ projectName: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

interface IProjectWithStatus extends IProject {
  success: boolean;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).projectName;
  const response = await getProject(id);

  if (!response.success) {
    return {
      title: "Не найдено",
    };
  }

  const product: IProjectWithStatus = await response;

  return {
    title: product.name,
    description: `${product.name}`
  };
}

export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ projectName: string }>;
}) {
  const param = (await params).projectName;
  const project: IProjectWithStatus = await getProject(param);

  if (!project || !project.success) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-red-600">Проект не найден</h1>
        <p className="text-gray-600 mt-2">К сожалению, проект не найден или произошла ошибка.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">{ project.name }</h1>
        <div className="mt-4 justify-self-start">
          <EmblaCarousel slides={ project.images } />
        </div>
      </header>

      <section className="mb-8 bg-gray-50 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold  mb-4">Описание проекта</h2>
        <p className="text-gray-600 leading-relaxed">{ project.description }</p>
      </section>

      <section className="mb-8 bg-gray-50 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold  mb-4">Состав работ</h2>
        <p className="text-gray-600 leading-relaxed">{ project.workStructure }</p>
      </section>

      <section className="mb-8 bg-gray-50 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold  mb-4">Область проекта</h2>
        <div className="text-gray-600">
          <p>
            <strong>Сектор:</strong> { project.sector }
          </p>
          <p>
            <strong>Услуга:</strong> { project.service }
          </p>
        </div>
      </section>

      <section className="mb-8 bg-gray-50 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold  mb-4">Детали</h2>
        <div className="text-gray-600">
          <p>
            <strong>Заказчик:</strong> { project.client }
          </p>
          <p className="">
            <strong>Стоимость:</strong> { ' ' }
            <span className=" text-xl p-1">
              { new Intl.NumberFormat("ru-RU").format(project.price) } ₽
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
