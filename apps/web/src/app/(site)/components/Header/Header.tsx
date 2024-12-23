import { HeaderProps } from "./Header.props";
import cn from "classnames";
import styles from "./Header.module.css";
import { DialogWin } from "../Dialog/Dialog";
import Link from "next/link";
import { ContactData } from "@/components/ContactData/ContactData";
import { urls } from "../lib/urls";
import { DraweMod } from "./components/DrawerMod/DrawerMod";

export default function Header({ className, ...props }: HeaderProps) {
  return (
    <div className={ cn(className, styles.header) } { ...props }>
      <div className={ styles.main__header }>
        <DialogWin
          variant="default"
          size="lg"
          text="Рассчитать цену"
          className={ styles.dialog }
        />
        <ul className={ styles.links }>
          { urls.map((value, i) => (
            <li key={ i }>
              <Link className={ styles.link } href={ value.url }>
                { value.name }
              </Link>
            </li>
          )) }
        </ul>
        <div className={ styles.drawer }>
          <DraweMod />
        </div>
        <ContactData className={ styles.commun }></ContactData>
        <DialogWin
          variant="default"
          size="lg"
          text="Заказать звонок"
          className={ styles.instr }
        />
      </div>
    </div>
  );
}
