import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const modules = [
  { id: "heroes", name: "Система героев", href: "/modules/heroes" },
  { id: "inventory", name: "Инвентарь", href: "/modules/inventory" },
  { id: "quests", name: "Квесты", href: "/modules/quests" },
  { id: "guilds", name: "Альянсы", href: "/modules/guilds" },
  { id: "minigames", name: "Мини-игры", href: "/modules/minigames" },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="border-b border-border bg-card h-16 flex items-center px-6">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="text-xl font-bold">
            Админ Панель PSRE
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Настройки
            </Button>
            <Button variant="ghost" size="sm">
              Выход
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card min-h-[calc(100vh-4rem)]">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">
              ИГРОВЫЕ МОДУЛИ
            </h3>
            <nav className="space-y-1">
              {modules.map((module) => (
                <Link
                  key={module.id}
                  href={module.href}
                  className="block px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {module.name}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
} 