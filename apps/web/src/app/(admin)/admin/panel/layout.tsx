import "@/globals.css";
import styles from "./layout.module.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";

export default function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className={ styles.wrapper }>
        <SidebarTrigger />
        <div className={ styles.body }>{ children }</div>
      </main>
      <ToastContainer />
    </SidebarProvider>
  );
}
