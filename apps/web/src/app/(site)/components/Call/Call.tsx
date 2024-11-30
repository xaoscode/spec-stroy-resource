"use client";
import { CallProps } from "./Call.props";
import cn from "classnames";
import styles from "./Call.module.css";
import CallForm from "@/components/CallForm/CallForm";

export default function Call({ className, ...props }: CallProps) {
  return (
    <div className={cn(className, styles.call)} {...props}>
      <CallForm></CallForm>
      {/* <form autoComplete={"off"} className={styles.form}> */}
      {/*   <h2 className={styles.header__text}> */}
      {/*     Воспользуйтесь консультацией от специалиста */}
      {/*   </h2> */}
      {/*   <div className={styles.input__group}> */}
      {/*     <label className={styles.label__text} htmlFor="name"> */}
      {/*       Имя */}
      {/*     </label> */}
      {/*     <Input name="name" placeholder="Ваше имя"></Input> */}
      {/*   </div> */}
      {/*   <div className={styles.input__group}> */}
      {/*     <label className={styles.label__text} htmlFor="number"> */}
      {/*       Номер телефона */}
      {/*     </label> */}
      {/*     <PhoneInp name="number" value={phone} onChange={setPhone} /> */}
      {/*   </div> */}
      {/*   <div className={styles.input__group}> */}
      {/*     <label className={styles.label__text} htmlFor="name"> */}
      {/*       Email */}
      {/*     </label> */}
      {/*     <Input name="name" placeholder="Email"></Input> */}
      {/*   </div> */}
      {/*   <Button size="lg">Оставить заявку</Button> */}
      {/* </form> */}
    </div>
  );
}
