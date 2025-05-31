import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SlotsPage() {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Слоты</h1>
        <p className="text-muted-foreground mb-6">
          Настройка игровых автоматов
        </p>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Общие настройки</CardTitle>
              <CardDescription>
                Основные параметры слот-машин
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Статус игры</label>
                  <p className="text-sm text-muted-foreground">Активна</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Минимальная ставка</label>
                  <p className="text-sm text-muted-foreground">10 монет</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Максимальная ставка</label>
                  <p className="text-sm text-muted-foreground">1000 монет</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Коэффициенты выигрыша</CardTitle>
              <CardDescription>
                Настройка выплат и RTP
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">RTP (Return to Player)</label>
                  <p className="text-sm text-muted-foreground">95%</p>
                </div>
                <Button variant="outline" size="sm">
                  Редактировать таблицу выплат
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
} 