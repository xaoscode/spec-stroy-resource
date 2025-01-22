"use server";

import { IContent } from "@repo/interfaces";


export async function Text({ initialContent }: { initialContent: IContent }) {

    return (
        <div>
            <h2>{ initialContent?.header }</h2>
            { initialContent.block.map((value) => (
                <div key={ value.id }>
                    <h3>{ value.header }</h3>
                    <p>{ value.text }</p>
                </div>
            )) }
        </div>
    );
}