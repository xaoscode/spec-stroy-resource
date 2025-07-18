import { IContent } from "@repo/interfaces";

import { TextBlock } from "./TextBlock";
import { ImageTextBlock } from "./ImageTextBlock";
import { WarningBlock } from "./WarningBlock";
import { ListBlock } from "./ListBlock";
import { PriceListBlock } from "./PriceListBlock";
import { ComButton } from "./ComButton";
import { FileBlock } from "./FileBlock";







export function RenderContentBlock({ content }: { content: IContent }) {
    switch (content.type) {
        case "Текст":
            return <TextBlock initialContent={ content } />;
        case "Картинки с текстом":
            return <ImageTextBlock initialContent={ content } />;
        case "Список":
            return <ListBlock initialContent={ content } />;
        case "Предупреждение":
            return <WarningBlock initialContent={ content } />;
        case "Прайс-лист":
            return <PriceListBlock initialContent={ content } />;
        case "Кнопка связи":
            return <ComButton initialContent={ content } />;
        case "Файл":
            return <FileBlock initialContent={ content } />;
        default:
            return <p>Неизвестный тип контента</p>;
    }
};
