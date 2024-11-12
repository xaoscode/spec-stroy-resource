import { HeaderProps } from "./Header.props";
import cn from "classnames"
import styles from "./Header.module.css"
import { Button } from "@/components/Button/Button";
import Image from "next/image"
export default function Header({ className, ...props }: HeaderProps) {
    return (
        <div className={ cn(className, styles.header) } { ...props }>




            <Image src={ "/logo.svg" } alt={ "logo" } width={ 300 } height={ 300 } className={ styles.logo }></Image>
            <Button size="lg" variant="link">О компании</Button>
            <Button size="lg" variant="link">Выполненные проекты</Button>
            <Button size="lg" variant="link">Допуски</Button>
            <Button size="lg" variant="link">Сотрудники</Button>
            <Button size="lg" variant="link">Вакансии</Button>
            <Button size="lg" variant="link"></Button>


            <Button size="lg">Button</Button>


        </div>
    )
}