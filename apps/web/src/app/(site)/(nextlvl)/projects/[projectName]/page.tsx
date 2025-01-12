import { fetchFilteredProjects } from "@/app/(site)/api/Projects";
import { IProject } from "@repo/interfaces";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

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
  // read route params
  const id = (await params).projectName;

  // fetch data
  const product: IProject = await fetch(
    `http://localhost:3002/api/projects/get/${id}`,
  ).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.name,
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ projectName: string }>
}) {
  const param = (await params).projectName
  const data = await fetchFilteredProjects(1, 1)
  if (!data) {
    notFound();
  }
  return <div>{ param }</div>;
}
