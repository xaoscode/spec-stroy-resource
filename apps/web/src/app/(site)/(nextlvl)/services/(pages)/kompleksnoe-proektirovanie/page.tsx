import { fetchFilteredProjects } from "@/app/(site)/api/Projects";
import { OurProjects } from "@/components/OurProjects/OurProjects";

export default async function KomplexPage() {
  const projects = await fetchFilteredProjects(1, 5, { service: "instrumentalno_tekhnicheskoe_obsledovanie" })

  return <div>
    <div className="p-6 bg-gray-50 rounded-lg shadow-md mt-8 place-items-center">
      <div
        className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-primary
    "
      >
        Примеры
      </div>
      <OurProjects projects={ projects } />
    </div>
  </div>;
}
