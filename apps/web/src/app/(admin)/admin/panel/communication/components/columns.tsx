"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IComMessage, INewComMessage } from "@repo/interfaces"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import updateMessage from "../lib/actions"
import InfoDialog from "./InfoDialog"



const statuses: Array<INewComMessage["status"]> = ["new", "processed", "solved"];
const statusTranslations: Record<INewComMessage["status"], string> = {
    new: "Новый",
    processed: "В процессе",
    solved: "Решен",
};

export const columns: ColumnDef<IComMessage>[] = [

    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center">
                            Фильтр по статусу
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Выберите статус</DropdownMenuLabel>
                        { statuses.map((status, index) => (
                            <DropdownMenuItem
                                key={ index }
                                onClick={ () => {
                                    column.setFilterValue(status);
                                } }
                            >
                                { statusTranslations[status] }
                            </DropdownMenuItem>
                        )) }
                        <DropdownMenuItem onClick={ () => column.setFilterValue(undefined) }>
                            Все записи
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="">
                            { statusTranslations[payment.status] || "Новый" }
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Выберите статус</DropdownMenuLabel>
                        { statuses.map((status, index) => (
                            <DropdownMenuItem
                                key={ index }
                                onClick={ async () => {
                                    if (status !== payment.status) {
                                        updateMessage({ ...payment, status: status });
                                    }
                                } }
                            >
                                { statusTranslations[status as INewComMessage["status"]] }
                            </DropdownMenuItem>
                        )) }
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
        filterFn: (row, columnId, filterValue) => {
            if (!filterValue) return true;
            return row.getValue(columnId) === filterValue;
        },
    },
    {
        accessorKey: "phone",
        header: "Телефон",
        cell: ({ row }) => {
            const phone = row.original.phone;

            return phone
                ? phone.replace(
                    /^\+(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/,
                    "+$1 ($2) $3-$4-$5"
                )
                : "Нет данных";
        },
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "name",
        header: "Имя"
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Дата обращения
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const createdAt = row.original.createdAt;
            return createdAt
                ? new Intl.DateTimeFormat("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: userTimeZone,
                }).format(new Date(createdAt))
                : "Нет данных";
        },
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Дата обновления
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const updatedAt = row.original.updatedAt;
            return updatedAt
                ? new Intl.DateTimeFormat("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: userTimeZone,
                }).format(new Date(updatedAt))
                : "Нет данных";
        },
    },
    {
        accessorKey: "info",
        header: "Заметки",
        cell: ({ row }) => {
            return (
                <InfoDialog row={ row.original } />
            )
        }

    }



]
