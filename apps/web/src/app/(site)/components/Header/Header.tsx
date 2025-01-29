import { HeaderProps } from "./Header.props";
import cn from "classnames";
import styles from "./Header.module.css";
import { DialogWin } from "../Dialog/Dialog";
import Link from "next/link";
import { ContactData } from "@/components/ContactData/ContactData";
import { urls } from "../lib/urls";
import { DraweMod } from "./components/DrawerMod/DrawerMod";
import { Button } from "@/components/Button/Button";

export default function Header({ className, ...props }: HeaderProps) {
  return (
    <header className={ cn(className, styles.header) } { ...props }>
      <div className={ styles.main__header }>
        <Button asChild size="lg" variant="default">
          <Link href="/calculator" className={ styles.dialog }>
            Рассчитать цену
          </Link>
        </Button>

        {/* <DialogWin
          variant="default"
          size="lg"
          text="Рассчитать цену"
          className={ styles.dialog }
        /> */}
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

    </header >
  );
}
