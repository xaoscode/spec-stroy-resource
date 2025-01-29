"use server";

import { DialogWin } from "@/app/(site)/components/Dialog/Dialog";
import { IContent } from "@repo/interfaces";


export async function CommBut({ initialContent }: { initialContent: IContent }) {

    return (
        <div className="flex flex-col items-center gap-5">
            <DialogWin variant="filled" size="lg" text={ initialContent.text } />
        </div>
    );
}