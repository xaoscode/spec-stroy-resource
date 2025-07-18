import { IPage } from "@repo/interfaces"
import { ContentRender } from "../services/[service]/components/ContentRedner/ContentRender"
import { fetchCachedPage } from "../../api/Pages"
import { Metadata } from "next"
import allMetadata from "../lib/metadata"

export const metadata: Metadata = { ...allMetadata.about }

interface IPageWithStatus extends IPage {
  success: boolean
}
export default async function AboutPage() {
  const data: IPageWithStatus = await fetchCachedPage('about')
  return <div className="flex flex-col">

    { data.success ? data.section.map((section) => (
      <div key={ section.id } className="flex flex-col space-y-6 p-6 bg-gray-50 rounded-lg shadow-md gap-5">
        <h1 className=" text-center">{ section.title }</h1>
        { section.content.map((content) => (
          <ContentRender key={ content.id } customContent={ content } />
        )) }
      </div>
    )) : <div>Элементы страницы не найдены</div> }


  </div>
}
export const dynamic = "force-dynamic";