"use server";

import { IContent } from "@repo/interfaces";


export async function Warning({ initialContent }: { initialContent: IContent }) {

    return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
            <p className="text-xl font-medium">{ initialContent.header }</p>
            { initialContent.block.map((value) => (
                <div key={ value.id }>
                    <p>{ value.header }</p>
                    <p className="mt-2">{ value.text }</p>
                </div>
            )) }
        </div>
    );
}
