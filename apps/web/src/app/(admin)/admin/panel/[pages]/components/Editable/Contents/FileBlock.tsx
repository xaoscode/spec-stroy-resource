"use client";
import { IBlock, IContent, INewBlock } from "@repo/interfaces";
import { AdminButton } from "../../../../components/AdminButton/AdminButton";
import { addBlockAction, deleteAction, updateBlock, updateContent } from "../lib/content-service";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";

import cyrillicToTranslit from "cyrillic-to-translit-js";
import { FaFilePdf, FaFileWord, FaFileImage, FaFile } from "react-icons/fa";
import { AdminInput } from "../../../../components/AdminInput/AdminInput";

const FileIcon = ({ fileType }: { fileType: string }) => {
    switch (fileType) {
        case 'pdf':
            return <FaFilePdf className="text-red-500 text-4xl" />;
        case 'doc':
            return <FaFileWord className="text-blue-500 text-4xl" />;
        case 'docx':
            return <FaFileWord className="text-blue-500 text-4xl" />;
        case 'png':
        case 'jpg':
        case 'jpeg':
            return <FaFileImage className="text-green-500 text-4xl" />;
        default:
            return <FaFile className="text-gray-500 text-4xl" />;
    }
};

export function FileBlock({ initialContent }: { initialContent: IContent }) {
    const [isSaving, setIsSaving] = useState(false);

    const updateContentHandle = useDebouncedCallback(async (content: IContent) => {
        try {
            setIsSaving(true);
            const result = await updateContent(content);
            if (result.success) {
                toast.success("Изменения сохранены!");
            } else {
                toast.error("Не удалось выполнить действие");
            }
        } catch (error) {
            console.error("Error during action:", error);
            toast.error("Произошла ошибка");
        } finally {
            setIsSaving(false);
        }
    }, 500);

    const updateBlockHandle = useDebouncedCallback(async (data: { content: IBlock; file?: File }) => {
        try {
            setIsSaving(true);

            const result = await updateBlock(data);
            if (result.success) {
                toast.success("Изменения сохранены!");
            } else {
                toast.error("Не удалось выполнить действие");
            }
        } catch (error) {
            console.error("Error during action:", error);
            toast.error("Произошла ошибка");
        } finally {
            setIsSaving(false);
        }
    }, 500);

    const addBlockHandle = async (data: INewBlock) => {
        try {
            setIsSaving(true);
            const result = await addBlockAction(data);
            if (result.success) {
                toast.success("Изменения сохранены!");
            } else {
                toast.error("Не удалось выполнить действие");
            }
        } catch (error) {
            console.error("Error during action:", error);
            toast.error("Произошла ошибка");
        } finally {
            setIsSaving(false);
        }
    };

    const deleteHandle = async (data: { id: string; childTable: string; parentTable: string; parentId: string }) => {
        try {
            setIsSaving(true);
            const result = await deleteAction(data);
            if (result.success) {
                toast.success("Изменения сохранены!");
            } else {
                toast.error("Не удалось выполнить действие");
            }
        } catch (error) {
            console.error("Error during action:", error);
            toast.error("Произошла ошибка");
        } finally {
            setIsSaving(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, block: IBlock) => {
        if (e.target.files) {
            const file = e.target.files[0];

            const newName = cyrillicToTranslit().transform(file.name, "_");

            const renamedFile = new File([file], newName, { type: file.type });

            if (file && (file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {

                updateBlockHandle({ content: block, file: renamedFile });
            } else {
                toast.error("Пожалуйста, выберите файл PDF, DOC или DOCX.");
            }
        }
    };
    const triggerFileInput = (id: string) => {
        const fileInput = document.getElementById(`file-input-${id}`) as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    };
    return (
        <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col gap-6 mb-6">
                <AdminInput
                    inputSize="medium"
                    type="text"
                    defaultValue={ initialContent.header }
                    onChange={ (e) =>
                        updateContentHandle({ ...initialContent, header: e.target.value })
                    }
                    placeholder="Введите заголовок"

                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  border-t border-gray-300 pt-4">
                { initialContent.block.map((block) => (
                    <div
                        key={ block.id }
                        className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center"
                    >
                        <input
                            type="text"
                            defaultValue={ block.text }
                            onChange={ (e) =>
                                updateBlockHandle({ content: { ...block, text: e.target.value } })
                            }
                            placeholder="Отображаемое название файла"
                            className="w-full text-lg p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="mt-4 flex flex-col items-center gap-3 ">
                            <div
                                onClick={ () => triggerFileInput(block.id) }
                                className="cursor-pointer border rounded-md shadow p-4 w-36 h-36 flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition"
                            >
                                { block.image ? (
                                    <FileIcon
                                        fileType={ `${block.image.split('.').pop()}` }
                                    />
                                ) : (
                                    <span className="text-gray-500 text-center">
                                        Нажмите, чтобы загрузить файл <br /> (gif, doc, docx)
                                    </span>
                                ) }
                            </div>
                            <input
                                id={ `file-input-${block.id}` }
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                                onChange={ (e) => handleFileChange(e, block) }
                            />
                            { block.image && (
                                <div className="text-center">
                                    <Link
                                        href={ block.image }
                                        passHref
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Скачать файл: { block.image }
                                    </Link>
                                </div>
                            ) }
                        </div>
                        <AdminButton
                            onClick={ () =>
                                deleteHandle({
                                    id: block.id,
                                    childTable: "block",
                                    parentTable: "content",
                                    parentId: initialContent.id,
                                })
                            }
                            variant="remove"
                            size="sm"
                            className="mt-4"
                        >
                            Удалить
                        </AdminButton>
                    </div>
                )) }
            </div>

            <div className="flex flex-col items-center mt-8 space-y-4">
                <AdminButton
                    onClick={ () =>
                        addBlockHandle({
                            header: "",
                            text: "",
                            image: "",
                            index: initialContent.block.length + 1,
                            contentId: initialContent.id,
                        })
                    }
                    variant="add"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                    Добавить блок
                </AdminButton>

                { isSaving && (
                    <p className="text-gray-500 text-sm animate-pulse">Сохранение...</p>
                ) }
            </div>
        </div>

    );
}
