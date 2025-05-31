import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const modules = [
  {
    title: "Мини-игры",
    items: [
      { id: "slots", name: "Слоты", href: "/modules/minigames/slots" },
      { id: "roulette", name: "Рулетка", href: "/modules/minigames/roulette" },
      { id: "dice", name: "Кости", href: "/modules/minigames/dice" },
      { id: "wheel", name: "Колесо фортуны", href: "/modules/minigames/wheel" },
      { id: "crash", name: "Crash", href: "/modules/minigames/crash" },
    ]
  }
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
              МОДУЛИ
            </h3>
            <nav className="space-y-4">
              {modules.map((module) => (
                <div key={module.title}>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase">
                    {module.title}
                  </h4>
                  <div className="space-y-1">
                    {module.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="block px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
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