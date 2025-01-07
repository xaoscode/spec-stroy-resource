"use server";

import { IContent } from "@repo/interfaces";


export async function List({ initialContent }: { initialContent: IContent }) {

    return (
        <div>
            <h3>{ initialContent.header }</h3>
            <ul className="text-sm list-disc pl-6 text-gray-700  sm:text-base md:text-lg">
                { initialContent.block.map((value) => (
                    <li key={ value.id }>
                        { value.text }
                    </li>
                )) }
            </ul>
        </div>

    );
}
