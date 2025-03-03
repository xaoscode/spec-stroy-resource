import { FooterProps } from "./Footer.props";
import Link from "next/link";
import { urls } from "../lib/urls";
const contData = [
  { h: "tel:89098245770", text: "8 (909) 824-57-50" },
  { h: "mailto:ssr-dv@mail.ru", text: "ssr-dv@mail.ru" },
];

export default function Footer({ ...props }: FooterProps) {
  return (
    <footer className="flex flex-col content-center" { ...props }>
      <div className="flex flex-wrap gap-3 justify-center">
        { urls.map((value, index) => (
          <Link
            className="text-xl font-extralight tracking-wider hover:underline"
            href={ value.url }
            key={ index }
          >
            { value.name }
          </Link>
        )) }
      </div>

      <div className="flex flex-wrap gap-3 justify-center pt-5">
        { contData.map((value, index) => (
          <Link
            className="text-xl text-center text-primary hover:underline"
            href={ value.h }
            key={ index }
          >
            { value.text }
          </Link>
        )) }
      </div>

      {/* Обернуть в flex для центровки */ }
      <div className="flex justify-center pt-5 pb-5">
        <Link
          className="text-slate-600 text-lg text-center hover:underline"
          href={ "/politika-konfidencialnosti" }
        >
          Политика конфиденциальности
        </Link>
      </div>
    </footer>

  );
}
