import { AdminLayout } from "@/components/admin-layout";

export default function GameModulesPage() {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Игровые модули</h1>
        <p className="text-muted-foreground">
          Выберите конкретный модуль из списка слева для настройки
        </p>
      </div>
    </AdminLayout>
  );
} 