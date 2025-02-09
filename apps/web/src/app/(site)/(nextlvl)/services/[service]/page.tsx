import { fetchCachedPage } from "@/app/(site)/api/Pages";
import { IPage } from "@repo/interfaces";
import { ContentRender } from "./components/ContentRedner/ContentRender";
import { OurProjects } from "@/components/OurProjects/OurProjects";
import { fetchFilteredProjects } from "@/app/(site)/api/Projects";
import { Metadata } from "next";

interface IPageWithStatus extends IPage {
    success: boolean
}
type Props = {
    params: Promise<{ service: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = (await params).service;
    const data: IPageWithStatus = await fetchCachedPage(id)
    if (!data.success) {
        return {
            title: "Не найдено",
        };
    }



    return {
        title: data.title,
        description: `${data.description}`,
        keywords: data.keywords
    };
}

export default async function ProjectDetails({
    params,
}: {
    params: Promise<{ service: string }>
}) {
    const id = (await params).service;
    const data: IPageWithStatus = await fetchCachedPage(id)

    const projects = await fetchFilteredProjects(1, 5, { service: id })

    return <div className="flex flex-col gap-10">

        { data.success ? data.section.map((section) => (
            <div key={ section.id } className="flex flex-col space-y-6 p-6 bg-gray-50 rounded-lg shadow-md gap-5">
                <h2 className=" text-center">{ section.title }</h2>
                { section.content.map((content) => (
                    <ContentRender key={ content.id } customContent={ content } />
                )) }
            </div>
        )) : <div>Элементы страницы</div> }
        { projects.data.length > 0 && <div className="p-6 bg-gray-50 rounded-lg shadow-md  place-items-center">
            <div
                className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-primary
"
            >
                Примеры
            </div>

            <OurProjects projects={ projects.data } /> <></>

        </div> }


    </div>
}
