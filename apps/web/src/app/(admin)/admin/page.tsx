import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Projects() {
    return (
        <div>
            <h1>Добро пожаловать</h1>
            <Button asChild size="lg" variant="default">
                <Link href="/admin/panel">Панель</Link>
            </Button>
        </div>
    );
}
