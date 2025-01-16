
import ServiceBlock from "@/components/ServiceBlock/ServiceBlock";

export default async function Services() {

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="text-2xl font-bold text-primary">Наши услуги</div>
      <ServiceBlock />
    </div>
  );
}
