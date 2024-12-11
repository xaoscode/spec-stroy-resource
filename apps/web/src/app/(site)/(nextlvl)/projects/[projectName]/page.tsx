import { IProject } from "@repo/interfaces";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ projectName: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = (await params).projectName;

  // fetch data
  const product: IProject = await fetch(
    `http://localhost:3002/api/projects/${id}`,
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

export default async function ProjectDetails({}: Props) {
  return <div>{}</div>;
}
