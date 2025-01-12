"use client"
import { Button } from "@/components/ui/button";
import { useDebouncedCallback } from "use-debounce";
import updateMessage from "../lib/actions";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IComMessage } from "@repo/interfaces";

export default function InfoDialog({ row }: { row: IComMessage }) {

    const handleInfoChange = useDebouncedCallback((data: IComMessage) => {
        updateMessage(data)
    }, 1000)



    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Заметки</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Заметки</DialogTitle>
                    <DialogDescription>
                        <textarea
                            className="w-full h-[500px] text-black border-black border outline-none p-2 rounded-lg"
                            defaultValue={ row.info }
                            onChange={ (e) => handleInfoChange({ ...row, info: e.target.value }) }
                        />
                    </DialogDescription>
                </DialogHeader>

            </DialogContent>
        </Dialog>
    );
};


