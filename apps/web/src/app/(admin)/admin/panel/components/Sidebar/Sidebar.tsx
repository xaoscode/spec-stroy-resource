import { Home, Inbox } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Редактирование страниц",
    url: "#",
    icon: Home,
    subItems: [
      {
        title: "Услуги",
        url: null,
        subSubItems: [
          { title: "Строительно-техническая экспертиза жилья", url: "stroy" },
          { title: "Инструментальное обследование объектов", url: "instrumental" },
          { title: "BIM проектирование", url: "bim" },
          { title: "Комплексное проектирование", url: "complex" },
          { title: "Проектирование инженерных систем и сетей", url: "project" },

        ],
      },
      { title: "О компании", url: "about" },
      { title: "Допуски", url: "dopusk" },
      { title: "Контакты", url: "contacts" },
    ],
  },
  {
    title: "Управление проектами",
    url: "#",
    icon: Inbox,
    subItems: [
      { title: "Все проекты", url: "#messages" },
      { title: "Добавить проект", url: "#notifications" },
    ],
  },
  {
    title: "Связь с клиентами",
    url: "#",
    icon: Inbox,
    subItems: [
      { title: "Звонок", url: "#messages" },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent >
        <SidebarGroup >
          <SidebarGroupLabel>Спец Строй Ресурс</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu  >
              { items.map((item) => (
                <Collapsible
                  key={ item.title }
                  defaultOpen
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <item.icon className="mr-2 h-5 w-5" />
                        { item.title }
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    { item.subItems.length > 0 && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          { item.subItems.map((subItem) => (
                            <Collapsible key={ subItem.title } defaultOpen>
                              <SidebarMenuSubItem>
                                { subItem.subSubItems ? (
                                  <CollapsibleTrigger asChild>
                                    <span className="cursor-pointer">
                                      { subItem.title }
                                    </span>
                                  </CollapsibleTrigger>
                                ) : (
                                  <Link href={ `${subItem.url}` || "#" }>
                                    { subItem.title }
                                  </Link>
                                ) }
                              </SidebarMenuSubItem>
                              { subItem.subSubItems && (
                                <CollapsibleContent>
                                  <SidebarMenuSub className="pl-4">
                                    { subItem.subSubItems.map((subSubItem) => (
                                      <SidebarMenuSubItem
                                        key={ subSubItem.title }
                                      >
                                        <Link className="" href={ `${subSubItem.url}` }>
                                          { subSubItem.title }
                                        </Link>
                                      </SidebarMenuSubItem>
                                    )) }
                                  </SidebarMenuSub>
                                </CollapsibleContent>
                              ) }
                            </Collapsible>
                          )) }
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    ) }
                  </SidebarMenuItem>
                </Collapsible>
              )) }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
