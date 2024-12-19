import { FooterProps } from "./Footer.props";
import Link from "next/link";
import { urls } from "../lib/urls";
const contData = [
  { h: "tel:84212211607", text: "8 (4212) 21-16-07" },
  { h: "mailto:ssr-dv@mail.ru", text: "ssr-dv@mail.ru" },
];
export default function Footer({ ...props }: FooterProps) {
  return (
    <div className="flex flex-col content-center gap-5" {...props}>
      <div className="flex flex-wrap gap-3 justify-center">
        {urls.map((value, index) => (
          <Link
            className="text-xl font-extralight tracking-wider hover:underline"
            href={value.url}
            key={index}
          >
            {value.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {contData.map((value, index) => (
          <Link
            className="text-xl text-center text-primary hover:underline"
            href={value.h}
            key={index}
          >
            {value.text}
          </Link>
        ))}
      </div>
    </div>
  );
}
