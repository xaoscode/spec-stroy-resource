import { fetchPage } from "@/app/api/pages";
import { IPage } from "@repo/interfaces";
import { ContentRender } from "../services/[service]/components/ContentRedner/ContentRender";

interface IPageWithStatus extends IPage {
  success: boolean
}
export default async function DopuskPage() {
  const data: IPageWithStatus = await fetchPage('dopusk')

  return <div className="flex flex-col">

    { data.success ? data.section.map((section) => (
      <div key={ section.id } className="flex flex-col space-y-6 p-6 bg-gray-50 rounded-lg shadow-md gap-5">
        <h1 className=" text-center">{ section.title }</h1>
        { section.content.map((content) => (
          <ContentRender key={ content.id } customContent={ content } />
        )) }
      </div>
    )) : <div>Элементы страницы</div> }

  </div>
}
