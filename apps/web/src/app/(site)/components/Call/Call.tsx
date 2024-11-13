"use client"
import { CallProps } from "./Call.props";
import cn from "classnames"
import styles from "./Call.module.css"
import { useState } from "react";
import { Input, PhoneInp } from "@/components/inputs/PhoneInput/PhoneInput";
import { Button } from "@/components/Button/Button";
import OrnIcon from "@/../public/orn.svg"
import Orn2Icon from "@/../public/orn2.svg"

export default function Call({ className, ...props }: CallProps) {
    const [phone, setPhone] = useState<string>()
    console.log(typeof (phone))
    return (
        <div className={ cn(className, styles.call) } { ...props }>
            <OrnIcon />

            <form className={ styles.form }>

                <h1 className={ styles.header__text }>
                    Закажите звонок прямо сейчас
                </h1>
                <div className={ styles.input__group }>
                    <label className={ styles.label__text } htmlFor="name">Имя</label>
                    <Input name="name" placeholder="Ваше имя"></Input>
                </div>
                <div className={ styles.input__group }>
                    <label className={ styles.label__text } htmlFor="number">Номер телефона</label>
                    <PhoneInp name="number" value={ phone } onChange={ setPhone } />
                </div>
                <div className={ styles.input__group }>
                    <label className={ styles.label__text } htmlFor="name">Email</label>
                    <Input name="name" placeholder="Email"></Input>
                </div>
                <Button size="lg">Оставить</Button>

            </form>
            <Orn2Icon />

        </div>
    )
}