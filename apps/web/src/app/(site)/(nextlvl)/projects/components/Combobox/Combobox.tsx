"use client";
import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
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

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
    url: "next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
    url: "sveltekit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
    url: "nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
    url: "remix",
  },
  {
    value: "astro",
    label: "Astro",
    url: "astro",
  },
];

export function Combobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="h-[100%]"
          variant="outline"
          role="combobox"
          aria-expanded={open}
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Выберите отрасль"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-black" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Найти отрасль" />
          <CommandList>
            <CommandEmpty>Отралсь не найдена</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    if (currentValue !== value) {
                      const selectedFramework = frameworks.find(
                        (fw) => fw.value === currentValue,
                      );
                      if (selectedFramework) {
                        router.push(`${pathname}/${selectedFramework.url}`);
                      }
                    }
                  }}
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
