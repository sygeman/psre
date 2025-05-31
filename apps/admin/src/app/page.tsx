import { AdminLayout } from "@/components/admin-layout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Главная панель</h1>
        <p className="text-muted-foreground">
          Выберите модуль из списка слева для управления
        </p>
      </div>
    </AdminLayout>
  );
}
