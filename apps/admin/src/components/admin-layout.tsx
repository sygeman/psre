import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const minigames = [
  { id: "slots", name: "Слоты", href: "/minigames/slots" },
  { id: "roulette", name: "Рулетка", href: "/minigames/roulette" },
  { id: "dice", name: "Кости", href: "/minigames/dice" },
  { id: "wheel", name: "Колесо фортуны", href: "/minigames/wheel" },
  { id: "crash", name: "Crash", href: "/minigames/crash" },
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
              МИНИ-ИГРЫ
            </h3>
            <nav className="space-y-1">
              {minigames.map((game) => (
                <Link
                  key={game.id}
                  href={game.href}
                  className="block px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {game.name}
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