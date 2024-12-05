import { HeaderProps } from "./Header.props";
import cn from "classnames";
import styles from "./Header.module.css";
import { Button } from "@/components/Button/Button";
import Image from "next/image";
import { Dialog } from "../Dialog/Dialog";
import Link from "next/link";
import Map from "./components/Map/Map";
import { ContactData } from "./components/ContactData/ContactData";
export default function Header({ className, ...props }: HeaderProps) {
  return (
    <div className={cn(className, styles.header)} {...props}>
      <div className={styles.main__header}>
        <Dialog text="Рассчитать цену" className={styles.dialog}></Dialog>

        <div className={styles.logo__wrapper}>
          <Link href={"/"}>
            <Image
              className={styles.logo}
              src={"/logo.svg"}
              alt={"Логотип компании Спец Строй Ресурс"}
              width={100}
              height={100}
            ></Image>
          </Link>
        </div>

        <div className={styles.links}>
          <Button variant="link" size="sm">
            <Link href={"/"}>О компании</Link>
          </Button>
          <Button size="sm" variant="link">
            <Link href={"/"}>Выполненные проекты</Link>
          </Button>
          <Button size="sm" variant="link">
            <Link href={"/"}>Допуски</Link>
          </Button>
          <Button size="sm" variant="link">
            <Link href={"/"}>Сотрудники</Link>
          </Button>
        </div>
        <ContactData className={styles.commun}></ContactData>
        <Dialog
          text="Заказать обратный звонок"
          className={styles.instr}
        ></Dialog>
      </div>
    </div>
  );
}
