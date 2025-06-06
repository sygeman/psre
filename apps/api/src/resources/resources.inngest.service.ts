import { Injectable, OnModuleInit } from '@nestjs/common';
import { inngest } from '../lib/inngest';
import { pubSub } from '../lib/pubsub';
import { ResourcesService } from './resources.service';
import { RESOURCE_EVENTS, ResourceEventData } from './resources.events';

@Injectable()
export class ResourcesInngestService implements OnModuleInit {
  constructor(private readonly resourcesService: ResourcesService) {}

  onModuleInit() {
    // Настройка функций Inngest для обработки событий ресурсов
    this.setupEventHandlers();

    // Запуск периодической генерации ресурсов
    this.startResourceGeneration();
  }

  private setupEventHandlers() {
    // Обработчик обновления ресурсов
    inngest.createFunction(
      { id: 'handle-resource-update' },
      { event: RESOURCE_EVENTS.RESOURCE_UPDATED },
      async ({ event, step }) => {
        const { playerId, resourceType, newAmount } =
          event.data as ResourceEventData;

        await step.run('publish-resource-update', () => {
          pubSub.publish('resourceUpdated', {
            resourceUpdated: {
              playerId,
              resourceType,
              oldAmount: event.data.oldAmount,
              newAmount,
              updatedAt: new Date(),
            },
            playerId,
          });
        });

        await step.run('publish-player-resources-update', () => {
          const playerResources =
            this.resourcesService.getPlayerResources(playerId);
          if (playerResources) {
            pubSub.publish('playerResourcesUpdated', {
              playerResourcesUpdated: playerResources,
              playerId,
            });
          }
        });
      },
    );

    // Обработчик генерации ресурсов
    inngest.createFunction(
      { id: 'handle-resource-generation' },
      { event: RESOURCE_EVENTS.RESOURCE_GENERATED },
      async ({ event, step }) => {
        await step.run('simulate-resource-generation', () => {
          this.resourcesService.simulateResourceGeneration();
        });

        await step.run('notify-all-players', () => {
          // Уведомляем всех игроков об обновлении ресурсов
          // В реальном приложении здесь была бы логика для получения всех активных игроков
          const testPlayerId = 'player-123';
          const playerResources =
            this.resourcesService.getPlayerResources(testPlayerId);

          if (playerResources) {
            pubSub.publish('playerResourcesUpdated', {
              playerResourcesUpdated: playerResources,
              playerId: testPlayerId,
            });
          }
        });
      },
    );
  }

  private startResourceGeneration() {
    // Запускаем генерацию ресурсов каждые 30 секунд
    setInterval(() => {
      inngest.send({
        name: RESOURCE_EVENTS.RESOURCE_GENERATED,
        data: {
          timestamp: new Date(),
        },
      });
    }, 30000);
  }

  // Метод для отправки события обновления ресурса
  async sendResourceUpdateEvent(data: ResourceEventData) {
    await inngest.send({
      name: RESOURCE_EVENTS.RESOURCE_UPDATED,
      data,
    });
  }
}
