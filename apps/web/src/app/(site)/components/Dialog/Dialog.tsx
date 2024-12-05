"use client";
import { Button } from "@/components/Button/Button";
import {
  Trigger,
  Root,
  Portal,
  Close,
  Overlay,
  Content,
  Title,
  Description,
} from "@radix-ui/react-dialog";
import styles from "./Dialog.module.css";
import { Input, PhoneInp } from "@/components/inputs/PhoneInput/PhoneInput";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import IconX from "@/../public/X.svg";

interface DialogProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  text: string;
}

export function Dialog({
  text,
  variant = "default",
  size = "default",
  className,
  ...props
}: DialogProps) {
  const [phone, setPhone] = useState<string>();
  return (
    <div className={className} {...props}>
      <Root>
        <Trigger className={styles.trigger} asChild>
          <Button variant={variant} size={size}>
            <span>{text}</span>
          </Button>
        </Trigger>
        <Portal>
          <Overlay className={styles.overlay} />
          <Content className={styles.content}>
            <div className={styles.header}>
              <Title className={styles.title}>Заказать звонок</Title>
              <Description className={styles.description}>
                Заполните форму и мы Вам позвоним
              </Description>
            </div>
            <form action="" className={styles.form}>
              <fieldset className={styles.input__group}>
                <label className={styles.label__text} htmlFor="name">
                  Имя
                </label>
                <Input name="name" placeholder="Ваше имя"></Input>
              </fieldset>
              <fieldset className={styles.input__group}>
                <label className={styles.label__text} htmlFor="number">
                  Номер телефона
                </label>
                <PhoneInp name="number" value={phone} onChange={setPhone} />
              </fieldset>
              <fieldset className={styles.input__group}>
                <label className={styles.label__text} htmlFor="name">
                  Email
                </label>
                <Input name="name" placeholder="Email"></Input>
              </fieldset>
              <Close asChild>
                <Button>Оставить заявку</Button>
              </Close>
            </form>
            <Close asChild>
              <Button className={styles.x} variant="ghost" size="icon">
                <IconX className={styles.x__icon} />
              </Button>
            </Close>
          </Content>
        </Portal>
      </Root>
    </div>
  );
}

