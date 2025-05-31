'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  },
  {
    title: "Песочница",
    items: [
      { id: "connection", name: "Соединение", href: "/modules/connection" },
    ]
  }
];

// Компонент для отображения настройки
const SettingRow = ({ label, value, unit = '' }: { label: string; value: string | number; unit?: string }) => (
  <div className="px-2 py-1.5 bg-slate-800/30 rounded">
    <div className="flex justify-between items-center">
      <Label className="text-xs">{label}</Label>
      <span className="text-xs">{typeof value === 'number' ? value.toLocaleString() : value}{unit}</span>
    </div>
  </div>
);

// Компонент для отображения ресурса
const ResourceRow = ({ icon, name, value }: { icon: string; name: string; value: number }) => (
  <div className="flex items-center justify-between px-2 py-1.5 bg-slate-800/30 rounded">
    <Label className="flex items-center gap-1.5 text-xs">
      <span>{icon}</span>
      <span>{name}</span>
    </Label>
    <span className="text-xs">{value.toLocaleString()}</span>
  </div>
);

// Компонент для отображения награды
const RewardRow = ({ icon, name, min, max }: { icon: string; name: string; min: number; max: number }) => (
  <div className="flex justify-between items-center">
    <Label className="text-xs">{icon} {name}</Label>
    <span className="text-xs">{min.toLocaleString()}-{max.toLocaleString()}</span>
  </div>
);

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const showRightPanel = pathname?.includes('/modules/slots');

  // Лог изменений состояния
  const activityLog = [
    "Алмазы: 500 → 600 (+100)",
    "Еда: 45,000 → 50,000 (+5,000)",
    "Дерево: 30,000 → 50,000 (+20,000)",
    "Сталь: 25,000 → 50,000 (+25,000)",
    "Топливо: 40,000 → 50,000 (+10,000)"
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

  // Данные ресурсов
  const resources = [
    { icon: '🌾', name: 'Еда', key: 'food' as keyof typeof accountData },
    { icon: '🪵', name: 'Древесина', key: 'wood' as keyof typeof accountData },
    { icon: '🔩', name: 'Сталь', key: 'steel' as keyof typeof accountData },
    { icon: '🛢️', name: 'Топливо', key: 'fuel' as keyof typeof accountData },
    { icon: '💎', name: 'Алмазы', key: 'diamond' as keyof typeof accountData },
  ];

  // Данные наград
  const rewards = [
    { icon: '🌾', name: 'Еда', min: moduleSettings.foodMin, max: moduleSettings.foodMax },
    { icon: '🪵', name: 'Дерево', min: 5000, max: 50000 },
    { icon: '🔩', name: 'Сталь', min: 5000, max: 50000 },
    { icon: '🛢️', name: 'Топливо', min: 5000, max: 50000 },
    { icon: '💎', name: 'Алмазы', min: moduleSettings.diamondMin, max: moduleSettings.diamondMax },
  ];

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
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          pathname === item.href
                            ? 'bg-accent text-accent-foreground font-medium'
                            : 'hover:bg-accent hover:text-accent-foreground'
                        }`}
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
        {showRightPanel && (
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
                      <SettingRow label="Шанс ресурсов" value={moduleSettings.regularChance} unit="%" />
                      <SettingRow label="Шанс алмазов" value={moduleSettings.diamondChance} unit="%" />
                      <SettingRow label="Макс. попыток" value={moduleSettings.maxAttempts} />
                      <SettingRow label="Восстановление" value={moduleSettings.restoreTime} unit="с" />
                      <SettingRow label="Длительность" value={moduleSettings.duration} unit="мс" />
                      
                      <div className="px-2 py-1.5 bg-slate-800/30 rounded">
                        <Label className="text-xs text-muted-foreground mb-1 block">Награды:</Label>
                        <div className="space-y-1">
                          {rewards.map((reward) => (
                            <RewardRow 
                              key={reward.name}
                              icon={reward.icon}
                              name={reward.name}
                              min={reward.min}
                              max={reward.max}
                            />
                          ))}
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
                          <div key={index} className="text-xs text-slate-300">
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
                      {resources.map((resource) => (
                        <ResourceRow
                          key={resource.key}
                          icon={resource.icon}
                          name={resource.name}
                          value={accountData[resource.key]}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
} 