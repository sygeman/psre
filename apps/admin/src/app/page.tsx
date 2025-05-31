import { MainLayout } from "@/components/main-layout";

export default function AdminDashboard() {
  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Главная панель</h1>
        <p className="text-muted-foreground">
          Добро пожаловать в административную панель
        </p>
      </div>
    </MainLayout>
  );
}
