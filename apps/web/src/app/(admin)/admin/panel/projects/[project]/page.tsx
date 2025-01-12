
import EditableProjectRender from "./components/EditableProjectRender";
import { getProject } from "../lib/project-service";


export default async function AdminProject({
    params,
}: {
    params: Promise<{ project: string }>
}) {

    const id = (await params).project

    const data = await getProject(id)
    console.log(data)
    return <div>

        <EditableProjectRender project={ data } />
    </div>
}