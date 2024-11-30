import { Button } from "@/components/Button/Button";
import Link from "next/link";
import PhoneIcon from "@/../public/phone.svg";
import MailIcon from "@/../public/mail.svg";
import styles from "./ContactData.module.css";
import { ContactDataProps } from "./ContactData.props";

import cn from "classnames";
export function ContactData({ className, ...props }: ContactDataProps) {
  return (
    <div className={cn(styles.contact, className)} {...props}>
      <Link href="tel:89966831963" passHref>
        <Button variant="link" size="sm">
          <PhoneIcon />
          <span>8 996 683-19-63</span>
        </Button>
      </Link>
      <span className={styles.separator}>/</span>
      <Link href="mailto:horny.bad.boy1337@gmail.com" passHref>
        <Button variant="link" size="sm">
          <MailIcon />
          <span>horny.bad.boy1337@gmail.com</span>
        </Button>
      </Link>
    </div>
  );
}
