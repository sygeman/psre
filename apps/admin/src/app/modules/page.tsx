import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminHeader } from "@/components/admin-header";

// Моковые данные игровых модулей
const gameModules = [
  {
    id: 1,
    name: "Система героев",
    description: "Управление персонажами и их характеристиками",
    status: "active",
    version: "2.1.0",
    lastUpdated: "2024-01-15",
    users: 1234
  },
  {
    id: 2,
    name: "Инвентарь и предметы",
    description: "Система предметов, экипировки и торговли",
    status: "active",
    version: "1.8.5",
    lastUpdated: "2024-01-14",
    users: 1156
  },
  {
    id: 3,
    name: "Система квестов",
    description: "Создание и управление игровыми заданиями",
    status: "maintenance",
    version: "1.5.2",
    lastUpdated: "2024-01-10",
    users: 892
  },
  {
    id: 4,
    name: "Система альянсов",
    description: "Гильдии, кланы и совместная игра",
    status: "active",
    version: "1.3.1",
    lastUpdated: "2024-01-12",
    users: 654
  },
  {
    id: 5,
    name: "Мини-игры",
    description: "Слоты, рулетка и другие казуальные игры",
    status: "inactive",
    version: "0.9.0",
    lastUpdated: "2023-12-20",
    users: 234
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge variant="default" className="bg-green-600">Активен</Badge>;
    case "maintenance":
      return <Badge variant="secondary" className="bg-yellow-600">Техработы</Badge>;
    case "inactive":
      return <Badge variant="destructive">Отключен</Badge>;
    default:
      return <Badge variant="outline">Неизвестно</Badge>;
  }
};

export default function GameModulesPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader 
        title="Игровые модули" 
        description="Управление компонентами игровой системы"
      >
        <Button>
          Добавить модуль
        </Button>
      </AdminHeader>

      <div className="container mx-auto p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Всего модулей</CardTitle>
              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center text-white">
                📦
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gameModules.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Активных</CardTitle>
              <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white">
                ✅
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {gameModules.filter(m => m.status === "active").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">На обслуживании</CardTitle>
              <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center text-white">
                🔧
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {gameModules.filter(m => m.status === "maintenance").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Общее использование</CardTitle>
              <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center text-white">
                👥
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {gameModules.reduce((sum, m) => sum + m.users, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules Table */}
        <Card>
          <CardHeader>
            <CardTitle>Список модулей</CardTitle>
            <CardDescription>
              Управляйте игровыми модулями и их настройками
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Модуль</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Версия</TableHead>
                  <TableHead>Пользователи</TableHead>
                  <TableHead>Обновлен</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gameModules.map((module) => (
                  <TableRow key={module.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{module.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {module.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(module.status)}
                    </TableCell>
                    <TableCell>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        v{module.version}
                      </code>
                    </TableCell>
                    <TableCell>
                      {module.users.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {module.lastUpdated}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm">
                          Настроить
                        </Button>
                        <Button variant="outline" size="sm">
                          Логи
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 