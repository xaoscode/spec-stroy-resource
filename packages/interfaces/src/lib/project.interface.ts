export enum Sector {
  AdministrativeBuildings = "Административные здания.",
  ApartmentBuildings = "Многоквартирные жилые дома",
  IndustrialFacilities = "Промышленные объекты: заводы и фабрики.",
  EducationalInstitutions = "Образовательные учреждения",
  LogisticsCenters = "Логистические центры и склады.",
  Reconstruction = "Реконструкция",
}

export enum Service {
  HousingTechnicalInspection = "Строительно-техническая экспертиза жилья",
  InstrumentalInspection = "Инструментально техническое обследование объектов",
  BIMDesign = "BIM проектирование",
  ComprehensiveDesign = "Комплексное проектирование",
  EngineeringSystemsDesign = "Проектирование инженерных систем и сетей",
}

export interface IProject {
  id: number;
  name: string;
  description: string;
  client: string;
  workStructure: string;
  price: number;
  sector: string;
  service: string;
  images: string[];
}
