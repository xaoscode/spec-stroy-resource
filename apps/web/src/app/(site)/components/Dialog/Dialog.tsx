"use client"

import { Button } from "@/components/Button/Button"
import { Trigger, Root, Portal, Close, Overlay, Content, Title, Description } from "@radix-ui/react-dialog"
import RevIcon from '@/../public/rev.svg'
import styles from "./Dialog.module.css"
import { Input, PhoneInp } from "@/components/inputs/PhoneInput/PhoneInput"
import { useState } from "react"



export function Dialog() {
    const [phone, setPhone] = useState<string>()
    return (
        <Root>
            <Trigger className={ styles.trigger } asChild>
                <Button>
                    <RevIcon />
                    <span>Заказать обратный звонок</span>
                </Button>
            </Trigger>
            <Portal>
                <Overlay className={ styles.overlay } />
                <Content className={ styles.content }>
                    <div className={ styles.header }>
                        <Title className={ styles.title }>Заказать звонок</Title>
                        <Description className={ styles.description }>
                            Заполните форму и мы Вам позвоним
                        </Description>
                    </div>
                    <fieldset className={ styles.input__group }>
                        <label className={ styles.label__text } htmlFor="name">Имя</label>
                        <Input name="name" placeholder="Ваше имя"></Input>
                    </fieldset>
                    <fieldset className={ styles.input__group }>
                        <label className={ styles.label__text } htmlFor="number">Номер телефона</label>
                        <PhoneInp name="number" value={ phone } onChange={ setPhone } />
                    </fieldset>
                    <fieldset className={ styles.input__group }>
                        <label className={ styles.label__text } htmlFor="name">Email</label>
                        <Input name="name" placeholder="Email"></Input>
                    </fieldset>
                    <div className={ styles.footer }>
                        <Close asChild>
                            <Button>Выкл</Button>
                        </Close>
                    </div>
                    <Close asChild>
                        <Button>Выкл</Button>
                    </Close>
                </Content>
            </Portal>
        </Root>
    )
}