import { fetchPage } from "@/app/api/pages"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DynamicForms from "./components/DynamicForms/DynamicForms";


export default async function Page({
    params,
}: {
    params: Promise<{ pages: string }>
}) {
    const slug = (await params).pages
    const data = await fetchPage(slug);

    return (
        <div className="flex flex-col justify-center">
            <h1>{ data.title }</h1>
            { data.sections.map((section: any, index: number) => (
                <div key={ index } className="section">
                    <h2>{ section.title }</h2>
                    <div>
                        { section.type === 'text' && <p>{ section.content }</p> }
                        { section.type === 'list' && (
                            <ul>
                                { section.content.map((item: string, index: number) => (
                                    <li key={ index }>{ item }</li>
                                )) }
                            </ul>
                        ) }
                        { section.type === 'price' && (
                            <div className="prices">
                                { section.content.map((price: string, index: number) => (
                                    <p key={ index }>{ price }</p>
                                )) }
                            </div>
                        ) }
                    </div>
                </div>
            )) }
            <DynamicForms />
        </div>
    )
}