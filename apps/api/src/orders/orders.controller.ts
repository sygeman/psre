import { Controller, Injectable } from '@nestjs/common';
import {
  InngestFunction,
  InngestTrigger,
  InngestContext,
} from '@psre/nestjs-inngest';

@Injectable()
@Controller('orders')
export class OrdersController {
  @InngestFunction({ id: 'orders-handler' })
  @InngestTrigger({ event: 'orders/order.created' })
  async handleOrderCreated(
    context: InngestContext<{ id: string; product: string; quantity: number }>,
  ) {
    const { event, step } = context;

    // Шаг 1: Логирование заказа
    await step.run('log-order', () => {
      console.log('Новый заказ создан:', event.data);
      return { logged: true };
    });

    // Шаг 2: Обработка заказа
    await step.run('process-order', () => {
      console.log(
        `Обработка заказа ${event.data.id}: ${event.data.product} x${event.data.quantity}`,
      );
      return { processed: true };
    });

    // Шаг 3: Отправка уведомления
    await step.run('send-notification', () => {
      console.log(`Отправка уведомления о заказе ${event.data.id}`);
      return { notified: true };
    });

    return { success: true };
  }

  @InngestFunction({ id: 'orders-cancelled-handler' })
  @InngestTrigger({ event: 'orders/order.cancelled' })
  async handleOrderCancelled(
    context: InngestContext<{ id: string; reason: string }>,
  ) {
    const { event, step } = context;

    await step.run('process-cancellation', () => {
      console.log(`Заказ ${event.data.id} отменен: ${event.data.reason}`);
      return { cancelled: true };
    });

    return { success: true };
  }
}
