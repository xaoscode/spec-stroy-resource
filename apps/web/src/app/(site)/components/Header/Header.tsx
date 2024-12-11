import { HeaderProps } from "./Header.props";
import cn from "classnames";
import styles from "./Header.module.css";
import { Dialog } from "../Dialog/Dialog";
import Link from "next/link";
import { ContactData } from "@/components/ContactData/ContactData";
const links = [
  {
    link: "/",
    name: "О компании",
  },
  {
    link: "/projects",
    name: "Проекты",
  },
  {
    link: "/services",
    name: "Услуги",
  },
  {
    link: "/",
    name: "Допуски",
  },
  {
    link: "/",
    name: "Сотрудники",
  },
];
export default function Header({ className, ...props }: HeaderProps) {
  return (
    <div className={cn(className, styles.header)} {...props}>
      <div className={styles.main__header}>
        <Dialog
          variant="outline"
          size="lg"
          text="Рассчитать цену"
          className={styles.dialog}
        />

        <ul className={styles.links}>
          {links.map((value, i) => (
            <li key={i}>
              <Link className={styles.link} href={value.link}>
                {value.name}
              </Link>
            </li>
          ))}
        </ul>
        <ContactData className={styles.commun}></ContactData>
        <Dialog
          variant="outline"
          size="lg"
          text="Заказать обратный звонок"
          className={styles.instr}
        />
      </div>
    </div>
  );
}
