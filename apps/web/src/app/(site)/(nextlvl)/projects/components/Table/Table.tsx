import { fetchFilteredProjects } from "@/app/(site)/api/Projects";
import { IProject, IProjectFilters } from "@repo/interfaces";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectsTable({
    filters,
    currentPage,
    currentPath
}: {
    filters: IProjectFilters;
    currentPage: number;
    currentPath: string
}) {
    try {
        const projects = await fetchFilteredProjects(currentPage, 9, filters);

        if (projects.success === false) {
            return (
                <div className="text-center py-10">
                    <p className="text-lg text-gray-600">Проекты не найдены</p>
                </div>
            );
        }

        return (

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                { projects.map((project: IProject) => (

                    <div
                        key={ project.id }
                        className="flex flex-col space-y-6 p-6 bg-gray-50 rounded shadow-md hover:shadow-primary"
                    >
                        <div className="relative group">
                            {
                                project.images[0] && <Image
                                    className=""
                                    src={ project.images[0].url }
                                    alt={ `Изображение ${project.name}` }
                                    width={ 300 }
                                    height={ 300 }
                                />
                            }

                            <div className="absolute inset-0 items-center justify-center bg-black bg-opacity-50 group-hover:flex hidden">
                                <Link
                                    className="text-white text-center text-xl hover:underline"
                                    href={ `${currentPath}/${project.id}` }
                                >
                                    { project.name }
                                </Link>
                            </div>
                        </div>

                        <div>
                            <Link
                                className="text-primary font-bold text-justify text-xl hover:underline"
                                href={ `${currentPath}/${project.id}` }
                            >
                                { project.name }
                            </Link>

                            <div className="grid grid-cols-[120px_1fr] gap-4 mt-4">
                                <div className="font-light text-primary text-lg">Описание:</div>
                                <p>{ project.description }</p>

                                <div className="font-light text-primary text-lg">Состав работ:</div>
                                <p>{ project.workStructure }</p>

                                <div className="font-light text-primary text-lg">Заказчик:</div>
                                <p>{ project.client }</p>

                                <div className="font-light text-primary text-lg">Сумма:</div>
                                <p>{ new Intl.NumberFormat("ru-RU").format(project.price) } ₽</p>
                            </div>
                        </div>
                    </div>
                )) }
            </div>

        );
    } catch (error) {
        console.error("Ошибка загрузки проектов:", error);
        return (
            <div className="text-center py-10">
                <p className="text-lg text-red-600">Произошла ошибка при загрузке проектов.</p>
            </div>
        );
    }
}
