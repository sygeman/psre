'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const modules = [
  {
    title: "Игры",
    items: [
      { id: "slots", name: "Слоты", href: "/modules/slots" },
    ]
  }
];

export function AdminLayout({ children }: AdminLayoutProps) {
  // Лог изменений состояния
  const activityLog = [
    "Алмазы: 500 → 600 (+100)",
    "Еда: 45000 → 50000 (+5000)",
    "Дерево: 30000 → 50000 (+20000)",
    "Сталь: 25000 → 50000 (+25000)",
    "Топливо: 40000 → 50000 (+10000)"
  ];

  // Данные аккаунта (только для отображения)
  const accountData = {
    food: 50000,
    wood: 50000,
    steel: 50000,
    fuel: 50000,
    diamond: 500,
  };

  // Настройки модуля (только для отображения)
  const moduleSettings = {
    regularChance: 40,
    diamondChance: 5,
    maxAttempts: 1,
    restoreTime: 150,
    duration: 2000,
    foodMin: 5000,
    foodMax: 50000,
    diamondMin: 100,
    diamondMax: 1000,
  };

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

        {/* Right Panel */}
        <aside className="w-72 border-l border-border bg-card min-h-[calc(100vh-4rem)]">
          <div className="p-3">
            <Tabs defaultValue="module" className="h-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="module" className="text-xs">Модуль</TabsTrigger>
                <TabsTrigger value="account" className="text-xs">Аккаунт</TabsTrigger>
              </TabsList>
              
              <TabsContent value="module" className="space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground mb-3">
                    СЛОТЫ
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="px-2 py-1.5 bg-slate-800/30 rounded">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs">Шанс ресурсов</Label>
                        <span className="text-xs font-mono">{moduleSettings.regularChance}%</span>
                      </div>
                    </div>
                    
                    <div className="px-2 py-1.5 bg-slate-800/30 rounded">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs">Шанс алмазов</Label>
                        <span className="text-xs font-mono">{moduleSettings.diamondChance}%</span>
                      </div>
                    </div>
                    
                    <div className="px-2 py-1.5 bg-slate-800/30 rounded">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs">Макс. попыток</Label>
                        <span className="text-xs font-mono">{moduleSettings.maxAttempts}</span>
                      </div>
                    </div>
                    
                    <div className="px-2 py-1.5 bg-slate-800/30 rounded">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs">Восстановление</Label>
                        <span className="text-xs font-mono">{moduleSettings.restoreTime}с</span>
                      </div>
                    </div>
                    
                    <div className="px-2 py-1.5 bg-slate-800/30 rounded">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs">Длительность</Label>
                        <span className="text-xs font-mono">{moduleSettings.duration}мс</span>
                      </div>
                    </div>
                    
                    <div className="px-2 py-1.5 bg-slate-800/30 rounded">
                      <Label className="text-xs text-muted-foreground mb-1 block">Награды:</Label>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <Label className="text-xs">🌾 Еда</Label>
                          <span className="text-xs font-mono">{moduleSettings.foodMin}-{moduleSettings.foodMax}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <Label className="text-xs">🪵 Дерево</Label>
                          <span className="text-xs font-mono">5000-50000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <Label className="text-xs">🔩 Сталь</Label>
                          <span className="text-xs font-mono">5000-50000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <Label className="text-xs">🛢️ Топливо</Label>
                          <span className="text-xs font-mono">5000-50000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <Label className="text-xs">💎 Алмазы</Label>
                          <span className="text-xs font-mono">{moduleSettings.diamondMin}-{moduleSettings.diamondMax}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="account" className="space-y-4">
                {/* Лог активности */}
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground mb-3">
                    ИЗМЕНЕНИЯ СОСТОЯНИЯ
                  </h3>
                  <div className="bg-slate-800/30 rounded p-2 h-32 overflow-y-auto">
                    <div className="space-y-1">
                      {activityLog.map((entry, index) => (
                        <div key={index} className="text-xs text-slate-300 font-mono">
                          {entry}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground mb-3">
                    РЕСУРСЫ
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between px-2 py-1.5 bg-slate-800/30 rounded">
                      <Label className="flex items-center gap-1.5 text-xs">
                        <span>🌾</span>
                        <span>Еда</span>
                      </Label>
                      <span className="text-xs font-mono">{accountData.food.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between px-2 py-1.5 bg-slate-800/30 rounded">
                      <Label className="flex items-center gap-1.5 text-xs">
                        <span>🪵</span>
                        <span>Древесина</span>
                      </Label>
                      <span className="text-xs font-mono">{accountData.wood.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between px-2 py-1.5 bg-slate-800/30 rounded">
                      <Label className="flex items-center gap-1.5 text-xs">
                        <span>🔩</span>
                        <span>Сталь</span>
                      </Label>
                      <span className="text-xs font-mono">{accountData.steel.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between px-2 py-1.5 bg-slate-800/30 rounded">
                      <Label className="flex items-center gap-1.5 text-xs">
                        <span>🛢️</span>
                        <span>Топливо</span>
                      </Label>
                      <span className="text-xs font-mono">{accountData.fuel.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between px-2 py-1.5 bg-slate-800/30 rounded">
                      <Label className="flex items-center gap-1.5 text-xs">
                        <span>💎</span>
                        <span>Алмазы</span>
                      </Label>
                      <span className="text-xs font-mono">{accountData.diamond.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </aside>
      </div>
    </div>
  );
} 