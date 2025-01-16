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
  { label: "Административные здания.", value: "administrative_buildings" },
  { label: "Многоквартирные жилые дома", value: "apartment_buildings" },
  { label: "Промышленные объекты: заводы и фабрики.", value: "industrial_facilities" },
  { label: "Образовательные учреждения", value: "educational_institutions" },
  { label: "Логистические центры и склады.", value: "logistics_centers" },
  { label: "Реконструкция", value: "reconstruction" },
];

export function Combobox() {
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const sectorParam = searchParams.get("sector") || "";
  const [value, setValue] = React.useState(sectorParam);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (newValue) {
      params.set("sector", newValue);
    } else {
      params.delete("sector");
    }

    setValue(newValue);
    replace(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  const getSelectedLabel = () =>
    value
      ? sectors.find((sector) => sector.value === value)?.label
      : "Выберите отрасль";

  return (
    <Popover open={ open } onOpenChange={ setOpen }>
      <PopoverTrigger asChild>
        <Button
          className="p-4 border-black rounded-none h-full text-lg font-normal"
          variant="outline"
          role="combobox"
          aria-expanded={ open }
        >
          <span className="truncate">{ getSelectedLabel() }</span>
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
                      value === sector.value ? "opacity-100" : "opacity-0"
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
