import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "@/globals.css";
import styles from "./layout.module.css";
import Footer from "./components/Footer/Footer";
import cn from "classnames";
import Header from "./components/Header/Header";
import Call from "./components/Call/Call";
const roboto = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Строительная компания Спец Строй Ресурс Проектно-инженерная компания: узнайте цены на сайте ssr-dv",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={ cn(roboto.className, styles.body__scroll) }>
        <div className={ styles.wrapper }>
          <Header className={ styles.header }></Header>
          <div className={ styles.body }>{ children }</div>
          <div className={ styles.call }>
            <Call></Call>
          </div>
          <Footer className={ styles.footer } />
        </div>
      </body>
    </html>
  );
}
