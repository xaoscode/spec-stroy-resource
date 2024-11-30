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
            О компании
          </Button>
          <Button size="sm" variant="link">
            Выполненные проекты
          </Button>
          <Button size="sm" variant="link">
            Допуски
          </Button>
          <Button size="sm" variant="link">
            Сотрудники
          </Button>
        </div>
        <ContactData className={styles.commun}></ContactData>
        <Dialog
          text="Заказать обратный звонок"
          className={styles.instr}
        ></Dialog>
      </div>
      <div className={styles.home__header}>
        <h1 className={styles.header__text}>
          Подготовим для вас проектную документацию для строительства,
          гарантируя её соответствие требованиям экспертизы и успешное получение
          разрешения на строительство.
        </h1>
        <Map></Map>
      </div>
    </div>
  );
}
