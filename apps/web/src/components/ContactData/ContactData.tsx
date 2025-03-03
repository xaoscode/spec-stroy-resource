import Link from "next/link";
import PhoneIcon from "@/../public/phone.svg";
import MailIcon from "@/../public/mail.svg";
import styles from "./ContactData.module.css";
import { ContactDataProps } from "./ContactData.props";
import cn from "classnames";
export function ContactData({ className, ...props }: ContactDataProps) {
  return (
    <ul className={ cn(styles.contact, className) } { ...props }>
      <li className={ styles.li }>
        <PhoneIcon />
        <Link className={ styles.link } href="tel:89098245770">
          <span>8 (909) 824-57-50</span>
        </Link>
      </li>
      <span className={ styles.separator }>/</span>
      <li className={ styles.li }>
        <MailIcon />
        <Link className={ styles.link } href="mailto:ssr-dv@mail.ru">
          <span>ssr-dv@mail.ru</span>
        </Link>
      </li>
    </ul>
  );
}
