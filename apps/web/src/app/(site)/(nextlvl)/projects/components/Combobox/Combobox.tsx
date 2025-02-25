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
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const sectors = [
  { label: "Административные здания", value: "administrative" },
  { label: "Многоквартирные жилые дома", value: "apartment" },
  { label: "Промышленные объекты: заводы и фабрики", value: "industrial" },
  { label: "Образовательные учреждения", value: "educational" },
  { label: "Логистические центры и склады", value: "logistics" },
  { label: "Реконструкция", value: "reconstruction" },
];

export function Combobox() {
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const sectorParam = searchParams.get("sector")?.split(",") || [];
  const [selectedValues, setSelectedValues] = React.useState<string[]>(sectorParam);

  const handleSelect = (currentValue: string) => {
    let newValues = [...selectedValues];
    if (newValues.includes(currentValue)) {
      newValues = newValues.filter(v => v !== currentValue);
    } else {
      newValues.push(currentValue);
    }

    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (newValues.length > 0) {
      params.set("sector", newValues.join(","));
    } else {
      params.delete("sector");
    }

    setSelectedValues(newValues);
    replace(`${pathname}?${params.toString()}`);
  };

  const getSelectedLabels = () => {
    if (selectedValues.length === 0) return "Выберите отрасли";
    if (selectedValues.length === 1) {
      return sectors.find(s => s.value === selectedValues[0])?.label;
    }
    return `Выбрано: ${selectedValues.length}`;
  };

  return (
    <Popover open={ open } onOpenChange={ setOpen }>
      <PopoverTrigger asChild>
        <Button
          className="p-4 border-black rounded-none h-full text-lg font-normal"
          variant="outline"
          role="combobox"
          aria-expanded={ open }
        >
          <span className="truncate">{ getSelectedLabels() }</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-black" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[350px] p-0">
        <Command>
          <CommandInput placeholder="Найти отрасль" />
          <CommandList>
            <CommandEmpty>Отрасль не найдена</CommandEmpty>
            <CommandGroup>
              { sectors.map((sector) => (
                <CommandItem
                  key={ sector.value }
                  value={ sector.value }
                  onSelect={ () => handleSelect(sector.value) }
                >
                  <Check
                    className={ cn(
                      "mr-2 h-4 w-4",
                      selectedValues.includes(sector.value)
                        ? "opacity-100"
                        : "opacity-0"
                    ) }
                  />
                  { sector.label }
                </CommandItem>
              )) }
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}