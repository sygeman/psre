import { AdminLayout } from "@/components/admin-layout";

export default function HeroesModulePage() {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Система героев</h1>
        <p className="text-muted-foreground mb-6">
          Управление персонажами и их характеристиками
        </p>
        
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Настройки модуля</h2>
          <p className="text-muted-foreground">
            Здесь будут настройки системы героев...
          </p>
        </div>
      </div>
    </AdminLayout>
  );
} 