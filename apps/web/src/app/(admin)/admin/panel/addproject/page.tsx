"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { addProject } from "../projects/lib/project-service";

export default function AdminAddProject() {
    const [projectData, setProjectData] = useState({
        name: "",
        description: "",
        client: "",
        workStructure: "",
        price: 0,
        sector: "",
        service: "",
        images: [] as File[],
    });


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProjectData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            if (projectData.images.length + files.length > 10) {
                toast.error("Можно загрузить не более 10 изображений.");
                return;
            }

            setProjectData((prev) => ({
                ...prev,
                images: [...prev.images, ...Array.from(files)],
            }));
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...projectData.images];

        updatedImages.splice(index, 1);

        setProjectData((prev) => ({ ...prev, images: updatedImages }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedNames = projectData.images.map((file: File) => {
            return new File([file], `${Date.now()}-${file.name}`, {
                type: file.type,
                lastModified: file.lastModified,
            });
        });

        const content = {
            ...projectData,
            images: updatedNames.map((file: File) => {
                return `${process.env.NEXT_PUBLIC_DOMAIN}/uploads/images/${file.name}`
            })
        };

        const response = await addProject(content, updatedNames);

        if (response.success) {
            toast.success("Проект успешно добавлен!");
            setProjectData({
                name: "",
                description: "",
                client: "",
                workStructure: "",
                price: 0,
                sector: "",
                service: "",
                images: [],
            });
        } else {
            toast.error("Ошибка при добавлении проекта.");
        }
    };

    return (
        <div className="flex flex-col gap-5 p-6 bg-gray-200 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Добавить новый проект</h1>
            <form onSubmit={ handleSubmit } className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">
                        Название проекта
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={ projectData.name }
                        onChange={ handleInputChange }
                        className="mt-1 block w-full rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium">
                        Описание
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={ projectData.description }
                        onChange={ handleInputChange }
                        className="mt-1 block w-full bg-white rounded-md"
                        rows={ 4 }
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="client" className="block text-sm font-medium">
                        Клиент
                    </label>
                    <input
                        type="text"
                        id="client"
                        name="client"
                        value={ projectData.client }
                        onChange={ handleInputChange }
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="work_structure" className="block text-sm font-medium">
                        Структура работы
                    </label>
                    <textarea
                        id="work_structure"
                        name="work_structure"
                        value={ projectData.workStructure }
                        onChange={ handleInputChange }
                        className="mt-1 block w-full bg-white rounded-md"
                        rows={ 4 }
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium">
                        Стоимость
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={ projectData.price }
                        onChange={ handleInputChange }
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        min={ 0 }
                    />
                </div>

                <div>
                    <label htmlFor="sector" className="block text-sm font-medium">
                        Сектор
                    </label>
                    <input
                        type="text"
                        id="sector"
                        name="sector"
                        value={ projectData.sector }
                        onChange={ handleInputChange }
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="service" className="block text-sm font-medium">
                        Услуга
                    </label>
                    <input
                        type="text"
                        id="service"
                        name="service"
                        value={ projectData.service }
                        onChange={ handleInputChange }
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="images" className="block text-sm font-medium">
                        Изображения ({ projectData.images.length }/10)
                    </label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        onChange={ handleFileChange }
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        multiple
                        accept="image/*"
                        disabled={ projectData.images.length >= 10 }
                    />
                    <div className="mt-2 grid grid-cols-5 gap-2">
                        { projectData.images.map((file, index) => (
                            <div key={ index } className="relative">
                                <Image
                                    src={ URL.createObjectURL(file) }
                                    alt={ `Изображение ${index + 1}` }
                                    className="w-full h-20 object-cover rounded border"
                                    width={ 200 }
                                    height={ 200 }
                                />
                                <button
                                    type="button"
                                    onClick={ () => handleRemoveImage(index) }
                                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex justify-center items-center"
                                >
                                    ×
                                </button>
                            </div>
                        )) }
                    </div>
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Добавить проект
                </button>
            </form>
        </div>
    );
}
