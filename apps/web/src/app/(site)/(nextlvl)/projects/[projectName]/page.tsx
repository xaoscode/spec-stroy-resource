import { fetchFilteredProjects, getProject } from "@/app/(site)/api/Projects";
import { API } from "@/app/api";
import { IProject } from "@repo/interfaces";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image"
type Props = {
  params: Promise<{ projectName: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const projects = await fetchFilteredProjects(1, 1)
  return projects.map((item: IProject) => ({ id: String(item.id) }))
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = (await params).projectName;

  const product: IProject = await fetch(
    `${API.projects}/get/${id}`
  ).then((res) => res.json());

  const previousImages = (await parent).openGraph?.images || [];

  const productImages = product.images?.map((image) => image.url) || [];

  return {
    title: product.name,
    openGraph: {
      images: [
        ...productImages,
        ...previousImages,
      ],
    },
  };
}

export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ projectName: string }>
}) {
  const param = (await params).projectName
  console.log(param)

  const project: IProject = await getProject(param)
  return <div className="container mx-auto p-6">
    {/* Заголовок */ }
    <header className="mb-8">
      <h1 className="text-3xl font-bold">{ project.name }</h1>
      <Image src={ project.images[0].url } alt={ project.images[0].name } width={ 300 } height={ 300 } />
      <p className="text-lg text-gray-600">{ project.description }</p>
    </header>

    {/* Основная информация */ }
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Цель проекта</h2>
      <p>Развитие инфраструктуры и повышение производительности предприятия.</p>
    </section>

    {/* Состав работ */ }
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Состав работ</h2>
      <p>
        { project.workStructure }
      </p>
    </section>



    {/* Площади */ }
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Площадь</h2>
      <p>
        <strong>Площадь участка:</strong> { project.sector }
      </p>
      <p>
        <strong>Площадь строений:</strong> { project.service }
      </p>
    </section>

    {/* Детали */ }
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
