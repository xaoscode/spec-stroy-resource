import { Home, Inbox, Mail, PowerIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { logoutAction } from "./lib/logout-action";
import { signOut } from "@/app/auth";

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
    ],
  },
  {
    title: "Управление проектами",
    url: "#",
    icon: Inbox,
    subItems: [
      { title: "Все проекты", url: "projects" },
      { title: "Добавить проект", url: "addproject" },
    ],
  },
  {
    title: "Связь с клиентами",
    url: "#",
    icon: Mail,
    subItems: [
      { title: "Звонок", url: "communication" },
    ],
  },
];

export function AppSidebar() {


  const logouta = async () => {
    "use server";

    const res = await logoutAction();

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Logout failed");
    }

    await signOut();


    // redirect(signOutResult.redirect);

  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Спец Строй Ресурс</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
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
                                  <Link href={ `/admin/panel/${subItem.url || ""}` }>
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
                                        <Link href={ `/admin/panel/${subSubItem.url || ""}` }>
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
      <SidebarFooter>
        <form action={ logouta }>
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Выход</div>
          </button>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}
