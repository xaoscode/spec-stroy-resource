"use client"
import { IProject } from "@repo/interfaces";
import { toast } from "react-toastify";
import Image from "next/image";
import { AdminButton } from "../../../components/AdminButton/AdminButton";
import { addImage, deleteImage, deleteProject, updateImage, updateProject } from "../../lib/project-service";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sector, Service } from "../../../lib/constants";

export default function EditableProjectRender({ project }: { project: IProject }) {

    const router = useRouter();

    const handleUpdateProject = useDebouncedCallback(async (project: IProject) => {
        try {
            const status = await updateProject(project)
            if (status.success) {
                toast.success('Успешное обоновление проекта')
            } else {
                toast.error("Ошибка при сохранении изменений.")
            }
        } catch (error) {
            console.error("Error during action:", error);
            toast.error("Произошла ошибка.");
        }
    }, 500)



    const handleDeleteProject = async () => {
        if (confirm("Вы уверены, что хотите удалить этот проект?")) {
            try {
                const status = await deleteProject(project.id);
                if (status.success) {
                    toast.success("Проект успешно удален");
                    router.back();
                } else {
                    toast.error("Ошибка при удалении проекта.");
                }
            } catch (error) {
                console.error("Error during project deletion:", error);
                toast.error("Произошла ошибка при удалении проекта.");
            }
        }
    };

    const triggerFileInput = (index: number) => {
        const fileInput = document.getElementById(`file-input-${index}`) as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    };
    return (
        <div className="flex flex-col gap-5 p-6 bg-gray-50 rounded shadow-md">
            <div className="grid gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Название
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        defaultValue={ project.name }
                        onChange={ (e) => handleUpdateProject({ ...project, name: e.target.value }) }
                    />
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Цели проекта (краткое описание)
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        defaultValue={ project.purpose }
                        onChange={ (e) => handleUpdateProject({ ...project, purpose: e.target.value }) }
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Описание
                    </label>
                    <textarea
                        id="description"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        defaultValue={ project.description }
                        onChange={ (e) => handleUpdateProject({ ...project, description: e.target.value }) }
                    />
                </div>
                <div>
                    <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                        Заказчик
                    </label>
                    <input
                        id="client"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        defaultValue={ project.client }
                        onChange={ (e) => handleUpdateProject({ ...project, client: e.target.value }) }
                    />
                </div>
                {/* <div>
                    <label htmlFor="workStructure" className="block text-sm font-medium text-gray-700">
                        Структура работы
                    </label>
                    <textarea
                        id="workStructure"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        defaultValue={ project.workStructure }
                        onChange={ (e) => handleUpdateProject({ ...project, workStructure: e.target.value }) }
                    />
                </div> */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Цена
                    </label>
                    <input
                        id="price"
                        type="number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        defaultValue={ project.price }
                        onChange={ (e) => handleUpdateProject({ ...project, price: parseFloat(e.target.value) || 0 }) }
                    />
                </div>
                <div>
                    <label htmlFor="sector" className="block text-sm font-medium text-gray-700">
                        Сектор
                    </label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="mt-1 block w-full border-gray-300 rounded-md py-2 text-left">
                                { project.sector || "Выберите сектор" }
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuLabel>Выберите сектор</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            { Object.values(Sector).map((sector, index) => (
                                <DropdownMenuItem key={ index } onClick={ () => handleUpdateProject({ ...project, sector }) }>
                                    { sector }
                                </DropdownMenuItem>
                            )) }
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
                <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                        Услуга
                    </label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="mt-1 block w-full border-gray-300 rounded-md py-2 text-left">
                                { project.service || "Выберите сектор" }
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuLabel>Выберите сектор</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            { Object.values(Service).map((service, index) => (
                                <DropdownMenuItem key={ index } onClick={ () => handleUpdateProject({ ...project, service }) }>
                                    { service }
                                </DropdownMenuItem>
                            )) }
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
            <AdminButton variant="add" onClick={ async () => {
                await addImage(project.id)
            } }>Добавить картику</AdminButton>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                { project.images && project.images.map((image, index) => (
                    <div key={ image.id } className="flex-1 text-center space-y-3 relative">
                        <div className="flex flex-col gap-5 justify-center items-center">
                            <AdminButton
                                onClick={ async () => {
                                    await deleteImage(image.id)
                                } }
                                variant="remove"
                            >
                                Удалить
                            </AdminButton>
                            <div
                                onClick={ () => triggerFileInput(index) }
                                className="cursor-pointer border rounded-md shadow p-2 w-64 h-64 flex items-center justify-center bg-gray-100"
                            >
                                { image.url ? (
                                    <Image
                                        src={ image.url }
                                        alt={ `Изображение ${image.id}` }
                                        width={ 300 }
                                        height={ 300 }
                                        className="rounded-md object-contain max-w-full"
                                        priority
                                    />
                                ) : (
                                    <span className="text-gray-500">Нажмите, чтобы добавить изображение типов jpg, jpeg, png, gif, svg</span>
                                ) }
                            </div>
                            <input
                                id={ `file-input-${index}` }
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={ (e) => {
                                    if (e.target.files) {
                                        const file = e.target.files[0];

                                        updateImage(image, file)
                                    }
                                } }
                            />
                        </div>
                    </div>
                )) }

            </div>

            <AdminButton variant="remove" onClick={ handleDeleteProject }>
                Удалить проект
            </AdminButton>

        </div>
    );
}
