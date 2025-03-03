import { Metadata } from "next";
import allMetadata from "../lib/metadata";

export const metadata: Metadata = { ...allMetadata.contacts }

export default function ContactsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Контакты</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Реквизиты ООО «СпецСтройРесурс» </h2>
        {/* <p className="mb-2">
          <strong>ОГРН:</strong> 61177746117471
        </p> */}
        <p className="mb-2">
          <strong>ИНН:</strong> 2723161469
        </p>
        <p>
          <strong>КПП:</strong> 272301001
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Описание</h2>
        <p>
          Полный цикл проектирования зданий, сооружений, инженерных сетей и систем на территории Хабаровска с гарантией успешного прохождения экспертизы.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Адрес:  </h2>
        <p>
          г. Хабаровск, улица Волочаевская, дом 8Е.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">График работы</h2>
        <p>
          Пн-Пт с 09:00 до 18:00
        </p>
        <p>
          Сб-Вс — Выходной.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Контакты</h2>
        <p className="mb-2">
          <strong>Телефон:</strong> 8 (909) 824-57-50
        </p>
        <p>
          <strong>Email:</strong> <a href="mailto:ssr-dv@mail.ru" className="text-blue-600 hover:underline">ssr-dv@mail.ru</a>
        </p>
      </section>


    </div>
  );
}
