import { fetchPage } from "@/app/api/pages";

import { IPage } from "@repo/interfaces";
import { EditableSection } from "./components/EditableSection/EditableSection";
import { QuoteApp } from "./components/EditableSection/govno";

export default async function Page({ params }: { params: { pages: string } }) {
    const { pages } = await params;

    // Запрос данных страницы по slug
    const pageData: IPage = await fetchPage(pages);
    console.log('получаю данные')
    if (!pageData) {
        return <div>Страница не найдена</div>;
    }

    return (
        <div className="container mx-auto p-4 min-w-full">
            {/* <QuoteApp></QuoteApp> */ }
            <EditableSection sections={ pageData.sections } pageId={ pageData.id } />


        </div>
    );
}
