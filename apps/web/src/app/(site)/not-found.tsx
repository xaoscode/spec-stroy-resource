import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Страница не найдена</h1>
      <p>К сожалению, запрашиваемая страница не существует.</p>
      <Link href="/">Вернуться на главную</Link>
    </div>
  );
}
