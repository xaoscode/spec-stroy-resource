import { useState } from "react";
import { Button } from "../Button/Button";
import { Input, PhoneInp } from "../inputs/PhoneInput/PhoneInput";
import styles from "./CallForm.module.css";
import { CallFormProps } from "./CallForm.props";
import cn from "classnames";
import { useForm } from "react-hook-form";

export default function CallForm({ className, ...props }: CallFormProps) {
  const [phone, setPhone] = useState<string>("");
  const {
    send,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form className={cn(styles.form, className)} {...props}>
      <h2 className={styles.header__text}>
        Воспользуйтесь консультацией от специалиста
      </h2>
      <div className={styles.input__group}>
        <label className={styles.label__text} htmlFor="name">
          Имя
        </label>
        <Input name="name" placeholder="Ваше имя"></Input>
      </div>
      <div className={styles.input__group}>
        <label className={styles.label__text} htmlFor="number">
          Номер телефона
        </label>
        <PhoneInp name="number" value={phone} onChange={setPhone} />
      </div>
      <div className={styles.input__group}>
        <label className={styles.label__text} htmlFor="name">
          Email
        </label>
        <Input name="name" placeholder="Email"></Input>
      </div>
      <Button size="lg">Оставить заявку</Button>
    </form>
  );
}
