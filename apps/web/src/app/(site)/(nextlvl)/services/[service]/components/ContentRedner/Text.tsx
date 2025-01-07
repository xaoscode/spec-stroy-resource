"use server";

import { IContent } from "@repo/interfaces";


export async function Text({ initialContent }: { initialContent: IContent }) {

    return (
        <div>
            <h3>{ initialContent?.header }</h3>
            { initialContent.block.map((value) => (
                <div key={ value.id }>
                    <h3>{ value.header }</h3>
                    <p>{ value.text }</p>
                </div>
            )) }
        </div>
    );
}