import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RoulettePage() {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Рулетка</h1>
        <p className="text-muted-foreground mb-6">
          Настройка европейской рулетки
        </p>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Параметры игры</CardTitle>
              <CardDescription>
                Основные настройки рулетки
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Тип рулетки</label>
                  <p className="text-sm text-muted-foreground">Европейская (37 чисел)</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Минимальная ставка</label>
                  <p className="text-sm text-muted-foreground">5 монет</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Максимальная ставка</label>
                  <p className="text-sm text-muted-foreground">500 монет</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
} 