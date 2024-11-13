import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google"
import "@/globals.css";
import styles from "./layout.module.css"
import Footer from "./components/Footer/Footer";
import cn from "classnames"
const roboto = Roboto_Flex({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Строительная компания",
  description: "Выезд специалиста",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" >

      <body className={ cn(roboto.className, styles.body__scroll) } >
        <div className={ styles.wrapper }>
          <div className={ styles.body }>
            { children }
          </div>
          <Footer className={ styles.footer } />
        </div>
      </body>

    </html >
  );
}
