import { IContent } from "@repo/interfaces";
import { ImageText } from "./ImageText";
import { List } from "./List";
import { Text } from "./Text";
import { PriceList } from "./PriceList";
import { Warning } from "./Warning";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { CommBut } from "./CommBut";

interface ContentRednerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    customContent: IContent
}



export async function ContentRender({ customContent, ...props }: ContentRednerProps) {
    switch (customContent.type) {
        case "Текст":
            return <Text initialContent={ customContent } { ...props } />
        case "Картинки с текстом":
            return <ImageText initialContent={ customContent } { ...props } />
        case "Список":
            return <List initialContent={ customContent } { ...props } />
        case "Предупреждение":
            return <Warning initialContent={ customContent } { ...props } />
        case "Прайс-лист":
            return <PriceList initialContent={ customContent } { ...props } />
        case "Кнопка связи":
            return <CommBut initialContent={ customContent } { ...props } />
        default:
            return <p>Неизвестный тип контента</p>;
    }
};
