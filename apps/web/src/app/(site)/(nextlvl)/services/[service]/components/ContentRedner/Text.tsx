"use server";

import { IContent } from "@repo/interfaces";


export async function Text({ initialContent }: { initialContent: IContent }) {

    return (
        <div>
            <h3>{ initialContent?.header }</h3>
            { initialContent.block.map((value) => (
                <div key={ value.id }>
                    <h4>{ value.header }</h4>
                    <p>{ value.text }</p>
                </div>
            )) }
        </div>
    );
}