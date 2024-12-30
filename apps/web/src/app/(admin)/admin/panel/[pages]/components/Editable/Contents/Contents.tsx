import { IContent } from "@repo/interfaces";

import { TextBlock } from "./TextBlock";
import { ImageTextBlock } from "./ImageTextBlock";
import { WarningBlock } from "./WarningBlock";
import { ListBlock } from "./ListBlock";
import { PriceListBlock } from "./PriceListBlock";







export function RenderContentBlock({ content }: { content: IContent }) {
    switch (content.type) {
        case "Текст":
            return <TextBlock initialContent={ content } />;
        case "Картинки с текстом":
            return <ImageTextBlock initialContent={ content.block } />;
        case "Список":
            return <ListBlock initialContent={ content } />;
        case "Предупреждение":
            return <WarningBlock initialContent={ content } />;
        case "Прайс-лист":
            return <PriceListBlock initialContent={ content } />;
        default:
            return <p>Неизвестный тип контента</p>;
    }
};
