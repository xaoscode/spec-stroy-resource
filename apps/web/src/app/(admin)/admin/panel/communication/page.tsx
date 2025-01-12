import { API } from "@/app/api"
import { auth } from "@/app/auth"
import { IComMessage } from "@repo/interfaces"
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

export default async function AdminCommunication() {
    const session = await auth()
    const data = await fetch(`${API.communication}/all`, {
        headers: {
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
        }
    })
    const messages: IComMessage[] = await data.json();


    return <DataTable columns={ columns } data={ messages } />
}