import { HeaderProps } from "./Header.props";
import cn from "classnames"
import styles from "./Header.module.css"
import { Button } from "@/components/Button/Button";
import Image from "next/image"
import { Dialog } from "../Dialog/Dialog";
import Link from "next/link";
import PhoneIcon from '@/../public/phone.svg'
import MailIcon from '@/../public/mail.svg'

export default function Header({ className, ...props }: HeaderProps) {
  return (
    <div className={cn(className, styles.header)} {...props}>
      <Dialog text="Рассчитать цену" className={styles.dialog}></Dialog>

      <div className={styles.logo__wrapper}>
        <Link href={'/'}>
          <Image className={styles.logo} src={"/logo.svg"} alt={"Логотип компании Спец Строй Ресурс"} width={100} height={100} ></Image>
        </Link>
      </div>


      <div className={styles.links}>
        <Button variant="link" size="sm" >О компании</Button>
        <Button size="sm" variant="link">Выполненные проекты</Button>
        <Button size="sm" variant="link">Допуски</Button>
        <Button size="sm" variant="link">Сотрудники</Button>
      </div>

      <div className={styles.commun}>
        <Link href="tel:89966831963" passHref >
          <Button variant="link" size="sm">
            <PhoneIcon />
            <span>8 996 683-19-63</span>
          </Button>
        </Link>
        <span>/</span>
        <Link href="mailto:horny.bad.boy1337@gmail.com" passHref >
          <Button variant="link" size="sm">
            <MailIcon />
            <span>horny.bad.boy1337@gmail.com</span>
          </Button>
        </Link>
      </div>

      <Dialog text="Заказать обратный звонок" className={styles.instr}></Dialog>
    </div>
  )
}
