import "@/globals.css";
import styles from "./layout.module.css";
import { Sidebar } from "./components/Sidebar/Sidebar";

export default function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.wrapper}>
      <Sidebar className={styles.sidebar} />
      <div className={styles.body}>{children}</div>
    </div>
  );
}
