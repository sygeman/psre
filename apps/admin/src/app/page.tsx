import Link from "next/link";
import { MainLayout } from "@/components/main-layout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Главная панель</h1>
        <p className="text-muted-foreground mb-8">
          Добро пожаловать в административную панель
        </p>

        <div className="max-w-md">
          <Link href="/modules">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎮</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Игровые модули</CardTitle>
                    <CardDescription>
                      Управление компонентами игры
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
