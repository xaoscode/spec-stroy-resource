import { HeaderProps } from "./Header.props";
import cn from "classnames"
import styles from "./Header.module.css"
import { Button } from "@/components/Button/Button";
import Image from "next/image"
import { Dialog } from "../Dialog/Dialog";
export default function Header({ className, ...props }: HeaderProps) {
    return (
        <div className={ cn(className, styles.header) } { ...props }>
            <Image className={ styles.logo } src={ "/logo.svg" } alt={ "Логотип компании Спец Строй Ресурс" } width={ 300 } height={ 300 } ></Image>
            <Button size="lg" variant="link">О компании</Button>
            <Button size="lg" variant="link">Выполненные проекты</Button>
            <Button size="lg" variant="link">Допуски</Button>
            <Button size="lg" variant="link">Сотрудники</Button>
            <Button size="lg" variant="link">Вакансии</Button>
            <Button size="lg" variant="link"></Button>
            <Dialog />
        </div>
    )
}