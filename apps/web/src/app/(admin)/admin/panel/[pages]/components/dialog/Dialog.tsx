"use client"
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const contentTypes = ["Text", "Image", "Video"];

const NewContentDialog = () => {
    const [open, setOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const handleSelectContentType = (type: string) => {
        setSelectedType(type);
    };

    const handleFormSubmit = (formData: any) => {
        // Отправка данных на сервер
        console.log("Sending to backend:", formData);
    };

    return (
        <Dialog open={ open } onOpenChange={ setOpen }>
            <DialogTrigger asChild>
                <button className="btn">Добавить новый блок</button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Выберите тип контента</DialogTitle>
                    <DialogDescription>
                        Выберите тип контента, который вы хотите добавить.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-4">
                    { contentTypes.map((type) => (
                        <button
                            key={ type }
                            onClick={ () => handleSelectContentType(type) }
                            className="btn"
                        >
                            { type }
                        </button>
                    )) }
                </div>

                { selectedType && (
                    <div className="mt-4">
                        <h3>{ `Форма для типа контента: ${selectedType}` }</h3>
                        { selectedType === "Text" && (
                            <form onSubmit={ (e) => { e.preventDefault(); handleFormSubmit({ type: selectedType, content: e.target.text.value }) } }>
                                <textarea name="text" placeholder="Введите текст" className="input" />
                                <button type="submit" className="btn">Отправить</button>
                            </form>
                        ) }
                        { selectedType === "Image" && (
                            <form onSubmit={ (e) => { e.preventDefault(); handleFormSubmit({ type: selectedType, content: e.target.image.files[0] }) } }>
                                <input type="file" name="image" className="input" />
                                <button type="submit" className="btn">Отправить</button>
                            </form>
                        ) }
                        { selectedType === "Video" && (
                            <form onSubmit={ (e) => { e.preventDefault(); handleFormSubmit({ type: selectedType, content: e.target.video.files[0] }) } }>
                                <input type="file" name="video" className="input" />
                                <button type="submit" className="btn">Отправить</button>
                            </form>
                        ) }
                    </div>
                ) }
            </DialogContent>
        </Dialog>
    );
};

export default NewContentDialog;
