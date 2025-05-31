import { AdminLayout } from "@/components/admin-layout";

export default function MinigamesPage() {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Мини-игры</h1>
        <p className="text-muted-foreground">
          Выберите конкретную мини-игру из списка слева для настройки
        </p>
      </div>
    </AdminLayout>
  );
} 