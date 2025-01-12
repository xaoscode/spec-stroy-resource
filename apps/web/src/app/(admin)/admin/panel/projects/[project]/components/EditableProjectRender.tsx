"use client";
import { IProject } from "@repo/interfaces";
import { toast } from "react-toastify";
import Image from "next/image";
import { AdminButton } from "../../../components/AdminButton/AdminButton";
import { useState, useEffect } from "react";
import { updateProject } from "../../lib/project-service";

export default function EditableProjectRender({ project }: { project: IProject }) {
    const [editableProject, setEditableProject] = useState<IProject>(project);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        const projectWithoutImages = { ...editableProject, images: [] };
        const originalWithoutImages = { ...project, images: [] };

        setIsChanged(
            JSON.stringify(projectWithoutImages) !== JSON.stringify(originalWithoutImages) || newImages.length > 0
        );
    }, [editableProject, project, newImages]);

    const handleInputChange = (key: keyof IProject, value: any) => {
        setEditableProject((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleFileChange = (files: FileList | null) => {
        if (!files) return;

        if (editableProject.images.length + newImages.length + files.length > 10) {
            toast.error("Можно загрузить не более 10 изображений.");
            return;
        }

        setNewImages((prev) => [...prev, ...Array.from(files)]);
    };

    const handleRemoveImage = (index: number, isNew: boolean) => {
        if (isNew) {
            setNewImages((prev) => prev.filter((_, i) => i !== index));
            setIsChanged(true)
        } else {
            const updatedImages = [...editableProject.images];
            updatedImages.splice(index, 1);
            setEditableProject((prev) => ({ ...prev, images: updatedImages }));
        }
    };

    const handleSubmit = async () => {
        try {
            const renamedFiles = newImages.map(
                (file) =>
                    new File([file], `${Date.now()}-${file.name}`, {
                        type: file.type,
                        lastModified: file.lastModified,
                    })
            );

            const updatedContent = {
                ...editableProject,
                images: [
                    ...editableProject.images,
                    ...renamedFiles.map((file) => `${process.env.NEXT_PUBLIC_DOMAIN}/uploads/images/${file.name}`),
                ],
            };

            const response = await updateProject({ content: updatedContent, files: renamedFiles });

            if (response.success) {
                toast.success("Изменения сохранены!");
                setEditableProject(updatedContent);
                setNewImages([]);
            } else {
                toast.error("Ошибка при сохранении изменений.");
            }
        } catch (error) {
            console.error("Error during action:", error);
            toast.error("Произошла ошибка.");
        }
    };

    return (
        <div className="flex flex-col gap-5 p-6 bg-gray-50 rounded shadow-md">
            <div className="grid gap-4">
                {/* Name */ }
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Название
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={ editableProject.name }
                        onChange={ (e) => handleInputChange("name", e.target.value) }
                    />
                </div>
                {/* Description */ }
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Описание
                    </label>
                    <textarea
                        id="description"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={ editableProject.description }
                        onChange={ (e) => handleInputChange("description", e.target.value) }
                    />
                </div>
                {/* Client */ }
                <div>
                    <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                        Заказчик
                    </label>
                    <input
                        id="client"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={ editableProject.client }
                        onChange={ (e) => handleInputChange("client", e.target.value) }
                    />
                </div>
                {/* Work Structure */ }
                <div>
                    <label htmlFor="workStructure" className="block text-sm font-medium text-gray-700">
                        Структура работы
                    </label>
                    <textarea
                        id="workStructure"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={ editableProject.workStructure }
                        onChange={ (e) => handleInputChange("workStructure", e.target.value) }
                    />
                </div>
                {/* Price */ }
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Цена
                    </label>
                    <input
                        id="price"
                        type="number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={ editableProject.price }
                        onChange={ (e) => handleInputChange("price", parseFloat(e.target.value)) }
                    />
                </div>
                {/* Sector */ }
                <div>
                    <label htmlFor="sector" className="block text-sm font-medium text-gray-700">
                        Сектор
                    </label>
                    <input
                        id="sector"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={ editableProject.sector }
                        onChange={ (e) => handleInputChange("sector", e.target.value) }
                    />
                </div>
                {/* Service */ }
                <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                        Услуга
                    </label>
                    <input
                        id="service"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={ editableProject.service }
                        onChange={ (e) => handleInputChange("service", e.target.value) }
                    />
                </div>
            </div>

            {/* Images */ }
            <div>
                <label htmlFor="images" className="block text-sm font-medium">
                    Изображения ({ editableProject.images.length + newImages.length }/10)
                </label>
                <input
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    onChange={ (e) => handleFileChange(e.target.files) }
                    disabled={ editableProject.images.length + newImages.length >= 10 }
                    className="mt-1 block w-full border-gray-300 rounded-md"
                />
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2">
                    { editableProject.images.map((url, index) => (
                        <div key={ index } className="relative">
                            <Image src={ url } alt={ `Изображение ${index + 1}` } width={ 200 } height={ 200 } className="rounded-md" />
                            <button
                                onClick={ () => handleRemoveImage(index, false) }
                                className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex justify-center items-center"
                            >
                                ×
                            </button>
                        </div>
                    )) }
                    { newImages.map((file, index) => (
                        <div key={ index } className="relative">
                            <Image
                                src={ URL.createObjectURL(file) }
                                alt={ `Новое изображение ${index + 1}` }
                                width={ 200 }
                                height={ 200 }
                                className="rounded-md"
                            />
                            <button
                                onClick={ () => handleRemoveImage(index, true) }
                                className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex justify-center items-center"
                            >
                                ×
                            </button>
                        </div>
                    )) }
                </div>
            </div>

            {/* Save Button */ }
            { isChanged && (
                <AdminButton onClick={ handleSubmit } variant="save">
                    Сохранить изменения
                </AdminButton>
            ) }
        </div>
    );
}
