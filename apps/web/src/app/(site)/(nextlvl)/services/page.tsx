import Link from "next/link";
const services = [
  {
    header: "Строительно-техническая экспертиза жилья",
    image: "/inspection.webp",
    url: "services/stroitelno-tekhnicheskaya-ekspertiza-zhilya",
  },
  {
    header: "Инструментально техническое обследование объектов",
    image: "/instrumental.webp",
    url: "services/instrumentalno-tekhnicheskoe-obsledovanie",
  },
  {
    header: "BIM проектирование",
    image: "/inspection.webp",
    url: "services/",
  },
  {
    header: "Комплексное проектирование",
    image: "/instrumental.webp",
    url: "services/",
  },
  {
    header: "Проектирование инженерных систем и сетей",
    image: "/instrumental.webp",
    url: "services/",
  },
];
export default function Services() {
  return (
    <div className="grid grid-cols-1 gap-8 pt-10">
      <div className="text-2xl font-bold text-primary">Наши услуги</div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-5 justify-center">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-primary p-4 border  shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Link
              href={service.url}
              className="mt-4 text-white text-lg font-semibold hover:underline"
            >
              {service.header}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
