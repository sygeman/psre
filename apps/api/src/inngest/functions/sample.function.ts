import { inngest } from '../client';

export const sampleFunction = inngest.createFunction(
  { id: 'sample-function' },
  { event: 'user/created' },
  async ({ event, step }) => {
    // Шаг 1: Логирование
    await step.run('log-user-created', async () => {
      console.log('Новый пользователь создан:', event.data);
      return { logged: true };
    });

    // Шаг 2: Отправка приветственного email (пример)
    await step.run('send-welcome-email', async () => {
      // Здесь была бы логика отправки email
      console.log(`Отправка приветственного email для ${event.data.email}`);
      return { emailSent: true };
    });

    return { success: true };
  },
);
