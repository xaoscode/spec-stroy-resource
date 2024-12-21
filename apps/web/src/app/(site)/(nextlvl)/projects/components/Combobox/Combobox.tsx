"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
export enum Sector {
  administrative_buildings = "Административные здания.",
  apartment_buildings = "Многоквартирные жилые дома",
  industrial_facilities = "Промышленные объекты: заводы и фабрики.",
  educational_institutions = "Образовательные учреждения",
  logistics_centers = "Логистические центры и склады.",
  reconstruction = "Реконструкция",
}

export enum Service {
  housing_technical_inspection = "Строительно-техническая экспертиза жилья",
  instrumental_inspection = "Инструментальное обследование объектов",
  bim_design = "BIM проектирование",
  comprehensive_design = "Комплексное проектирование",
  engineering_systems_design = "Проектирование инженерных систем и сетей",
}
const sectors = [
  {
    label: "Административные здания.",
    value: "administrative_buildings",
  },
  {
    label: "Многоквартирные жилые дома",
    value: "apartment_buildings",
  },
  {
    label: "Промышленные объекты: заводы и фабрики.",
    value: "industrial_facilities",
  },
  {
    label: "Образовательные учреждения",
    value: "educational_institutions",
  },
  {
    label: "Логистические центры и склады.",
    value: "logistics_centers",
  },
  {
    label: "Реконструкция",
    value: "reconstruction",
  },
];

interface ComboboxProps {
  onComboChange: (filter: string) => void;
}

export function Combobox({ onComboChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    setOpen(false);
    onComboChange(newValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="h-[100%] w-full  truncate"
          variant="outline"
          role="combobox"
          aria-expanded={open}
        >
          <span className="truncate">
            {value
              ? sectors.find((framework) => framework.value === value)?.label
              : "Выберите отрасль"}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-black" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0">
        <Command>
          <CommandInput placeholder="Найти отрасль" />
          <CommandList>
            <CommandEmpty>Отрасль не найдена</CommandEmpty>
            <CommandGroup>
              {sectors.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
