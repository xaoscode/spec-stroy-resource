import { fetchPage } from "@/app/api/pages";

import { IPage } from "@repo/interfaces";
import { EditableSection } from "./components/Editable/EditableSection";

export default async function Page({ params }: { params: { pages: string } }) {
    const pages = (await params).pages;



    const pageData: IPage = await fetchPage(pages);

    if (!pageData) {
        return <div>Страница не найдена</div>;
    }

    return (
        <div className="container mx-auto min-w-full p-5">
            <h1>{ pageData.title }</h1>
            <EditableSection sections={ pageData.section } pageId={ pageData.id } />
        </div>
    );
}
