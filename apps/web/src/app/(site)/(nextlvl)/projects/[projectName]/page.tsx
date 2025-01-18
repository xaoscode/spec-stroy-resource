import { getProject } from "@/app/(site)/api/Projects";
import { IProject } from "@repo/interfaces";
import type { Metadata } from "next";
import Image from "next/image"
type Props = {
  params: Promise<{ projectName: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};


interface IProjectWithStatus extends IProject {
  success: boolean
}



export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {

  const id = (await params).projectName;
  const response = await getProject(id)

  if (!response.success) {
    return {
      title: "Не найдено"

    };
  }


  const product: IProjectWithStatus = await response.json();

  return {
    title: product.name,

  };
}


export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ projectName: string }>
}) {
  const param = (await params).projectName;

  const project: IProjectWithStatus = await getProject(param);

  if (!project || !project.success) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">Проект не найден</h1>
        <p>Сервер временно недоступен. Пожалуйста, попробуйте позже.</p>
      </div>
    );
  }



  return <div className="container mx-auto p-6">
    <header className="mb-8">
      <h1 className="text-3xl font-bold">{ project.name }</h1>
      <Image src={ project.images[0].url } alt={ project.images[0].name } width={ 300 } height={ 300 } />
      <p className="text-lg text-gray-600">{ project.description }</p>
    </header>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Цель проекта</h2>
      <p>Развитие инфраструктуры и повышение производительности предприятия.</p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Состав работ</h2>
      <p>
        { project.workStructure }
      </p>
    </section>



    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Площадь</h2>
      <p>
        <strong>Площадь участка:</strong> { project.sector }
      </p>
      <p>
        <strong>Площадь строений:</strong> { project.service }
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Детали</h2>
      <p>
        <strong>Заказчик:</strong> { project.client }
      </p>

      <p>
        <strong>Стоимость:</strong> { project.price.toLocaleString() } ₽
      </p>

    </section>
  </div>

}
