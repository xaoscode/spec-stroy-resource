import Image from "next/image";
import { DialogWin } from "@/app/(site)/components/Dialog/Dialog";
import { OurProjects } from "@/components/OurProjects/OurProjects";
import { fetchFilteredProjects } from "@/app/(site)/api/Projects";
const priceData = [
  { type: "Студия (до 30 м²)", oldPrice: 5000, newPrice: 3500 },
  { type: "1-комнатная (включая евродвушки)", oldPrice: 6000, newPrice: 4500 },
  { type: "2-комнатная (включая евротрешки)", oldPrice: 7000, newPrice: 5500 },
  { type: "3-комнатная", oldPrice: 8000, newPrice: 6500 },
  { type: "4-комнатная", oldPrice: 9000, newPrice: 7500 },
  {
    type: "Чистовая отделка (с ремонтом)",
    newPrice: "+1000",
  },
];

export default async function StroitelPage() {
  const projects = await fetchFilteredProjects(1, 5, { service: "stroitelno_tekhnicheskaya_ekspertiza_zhilya" })
  return (
    <div>
      <div className="flex flex-col items-center space-y-6 p-6 ">
        <h1>
          Окажем профессиональную помощь в приёмке квартиры или дома от
          застройщика в Хабаровске.
        </h1>
        <DialogWin variant="filled" size="lg" text="Записаться" />
      </div>

      <div className="space-y-6 p-6 bg-gray-50 rounded-lg shadow-md">
        <h2>Что такое приёмка квартиры?</h2>
        <p>
          Приёмка квартиры в новостройке — это процесс проверки состояния жилья
          покупателем или дольщиком, в ходе которого составляется акт
          приёма-передачи недвижимости или акт с выявленными недостатками. Во
          время осмотра будущий собственник удостоверяется, что застройщик
          выполнил все свои обязательства, а квартира соответствует строительным
          и эксплуатационным требованиям.
        </p>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <p className="text-xl font-medium">Важно знать:</p>
          <p>Застройщик обязан передать квартиру без дефектов и нарушений.</p>
          <p className="mt-2">
            Но учтите, что полностью идеальных квартир не бывает!
          </p>
        </div>
        <h3>Что проверяем?</h3>
        <ul className="text-sm list-disc pl-6 text-gray-700  sm:text-base md:text-lg">
          <li>окна, двери, стены, пол;</li>
          <li>отделочные работы;</li>
          <li>вентиляцию, систему отопления;</li>
          <li>водоснабжение и водоотведение;</li>
          <li>электрическую сеть.</li>
        </ul>
        <h3>Что делаем дальше?</h3>
        <p>
          Заполняем чек-лист, фиксируем выявленные замечания и даём рекомендации
          по дальнейшим действиям.
        </p>
      </div>
      <div className="p-6 bg-gray-50 rounded-lg shadow-md mt-8">
        <h2 className="text-center mb-6">
          Риски самостоятельной приёмки квартиры
        </h2>
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex-1 text-center space-y-3">
            <Image
              width={ 100 }
              height={ 100 }
              src="http://localhost:3002/images/maini.webp"
              alt="Небезопасное проживание"
              className="w-full h-auto max-h-48 mx-auto rounded-md shadow"
            />
            <h3>Небезопасное проживание</h3>
            <p>
              При самостоятельной приёмке велика вероятность не заметить важные
              недочёты, которые могут напрямую повлиять на безопасность и
              комфорт вашей жизни.
            </p>
          </div>
          <div className="flex-1 text-center space-y-4">
            <Image
              width={ 100 }
              height={ 100 }
              src="http://localhost:3002/images/maini.webp"
              alt="Непредвиденные траты"
              className="w-full h-auto max-h-48 mx-auto rounded-md shadow"
            />
            <h3>Непредвиденные траты</h3>
            <p>
              Незамеченные дефекты часто становятся причиной дополнительных
              затрат на ремонт и восстановление, что приводит к финансовым
              потерям в будущем.
            </p>
          </div>
          <div className="flex-1 text-center space-y-4">
            <Image
              width={ 100 }
              height={ 100 }
              src="http://localhost:3002/images/maini.webp"
              alt="Непрофессиональное видение"
              className="w-full h-auto max-h-48 mx-auto rounded-md shadow"
            />
            <h3>Непрофессиональное видение</h3>
            <p>
              Без опыта и специальных инструментов легко пропустить скрытые
              дефекты, которые могут существенно повлиять на качество вашей
              квартиры.
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 bg-gray-50 rounded-lg shadow-md mt-8 flex flex-col lg:flex-row items-center gap-6">
        <div className="flex-1 space-y-4">
          <h2>Почему стоит обратиться за помощью?</h2>
          <p>
            Только профессионал с необходимым оборудованием может выявить
            скрытые дефекты и серьёзные нарушения, которые сложно заметить
            невооружённым глазом.
          </p>
          <p>
            Проведение тщательной диагностики требует больше, чем просто
            визуальная оценка или личный опыт. Глубокий анализ состояния
            квартиры возможен только с использованием специализированных
            инструментов.
          </p>
        </div>
        <div className="flex-1">
          <Image
            width={ 300 }
            height={ 300 }
            src="http://localhost:3002/images/maini.webp"
            alt="Непрофессиональное видение"
            className="w-full h-auto max-h-48 mx-auto rounded-md shadow"
          />
        </div>
      </div>
      <div className="p-6 bg-gray-50 rounded-lg shadow-md mt-8">
        <h2 className="text-center mb-6">Стоимость приёма квартиры</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          { priceData.map((item, index) => (
            <div
              key={ index }
              className="p-4 border rounded-md shadow-sm bg-white flex flex-col items-center space-y-2"
            >
              <h3 className="text-2xl font-bold text-primary">{ item.type }</h3>
              <div className="text-center">
                <p className="text-gray-500 line-through text-3xl">
                  { item.oldPrice } ₽
                </p>
                <p className="text-green-500 font-semibold text-5xl">
                  { item.newPrice } ₽
                </p>
              </div>
            </div>
          )) }
        </div>
      </div>
      <div className="p-6 bg-gray-50 rounded-lg shadow-md mt-8 place-items-center">
        <div
          className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-primary
"
        >
          Примеры
        </div>
        <OurProjects projects={ projects } />
      </div>
    </div>
  );
}
