import { fetchPage } from "@/app/(site)/api/Pages";
import { IPage } from "@repo/interfaces";
import { ContentRender } from "./components/ContentRedner/ContentRender";
import { OurProjects } from "@/components/OurProjects/OurProjects";
import { fetchFilteredProjects } from "@/app/(site)/api/Projects";

interface IPageWithStatus extends IPage {
    success: boolean
}

export default async function ProjectDetails({
    params,
}: {
    params: Promise<{ service: string }>
}) {
    const id = (await params).service;
    const data: IPageWithStatus = await fetchPage(id)

    const projects = await fetchFilteredProjects(1, 5, { service: id })

    return <div className="flex flex-col">

        { data ? data.section.map((section) => (
            <div key={ section.id } className="flex flex-col space-y-6 p-6 bg-gray-50 rounded-lg shadow-md gap-5">
                <h1 className=" text-center">{ section.title }</h1>
                { section.content.map((content) => (
                    <ContentRender key={ content.id } customContent={ content } />
                )) }
            </div>
        )) : <div>Элементы страницы</div> }
        <div className="p-6 bg-gray-50 rounded-lg shadow-md  place-items-center">
            <div
                className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-primary
"
            >
                Примеры
            </div>
            {
                projects.success &&
                <OurProjects projects={ projects.data } />

            }
        </div>

    </div>
}
