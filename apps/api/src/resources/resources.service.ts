import { Injectable } from '@nestjs/common';
import {
  PlayerResources,
  Resource,
  UpdateResourceInput,
  ResourceUpdate,
} from './resources.types';
import { randomUUID } from 'crypto';

@Injectable()
export class ResourcesService {
  private playerResources: Map<string, PlayerResources> = new Map();

  constructor() {
    // Инициализируем тестовые данные
    this.initTestData();
  }

  private initTestData() {
    const testPlayerId = 'player-123';
    const resources: Resource[] = [
      {
        id: randomUUID(),
        type: 'food',
        icon: '🌾',
        name: 'Еда',
        amount: 125420,
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        type: 'wood',
        icon: '🪵',
        name: 'Древесина',
        amount: 89650,
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        type: 'steel',
        icon: '🔩',
        name: 'Сталь',
        amount: 45320,
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        type: 'fuel',
        icon: '🛢️',
        name: 'Топливо',
        amount: 67890,
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        type: 'diamond',
        icon: '💎',
        name: 'Алмазы',
        amount: 1234,
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        type: 'vaccine',
        icon: '🧪',
        name: 'Вакцина',
        amount: 89,
        updatedAt: new Date(),
      },
    ];

    this.playerResources.set(testPlayerId, {
      playerId: testPlayerId,
      resources,
      updatedAt: new Date(),
    });
  }

  getPlayerResources(playerId: string): PlayerResources | null {
    return this.playerResources.get(playerId) || null;
  }

  updateResource(input: UpdateResourceInput): ResourceUpdate {
    const playerData = this.playerResources.get(input.playerId);
    if (!playerData) {
      throw new Error(`Player ${input.playerId} not found`);
    }

    const resource = playerData.resources.find(
      (r) => r.type === input.resourceType,
    );
    if (!resource) {
      throw new Error(
        `Resource ${input.resourceType} not found for player ${input.playerId}`,
      );
    }

    const oldAmount = resource.amount;
    resource.amount = input.amount;
    resource.updatedAt = new Date();
    playerData.updatedAt = new Date();

    return {
      playerId: input.playerId,
      resourceType: input.resourceType,
      oldAmount,
      newAmount: input.amount,
      updatedAt: new Date(),
    };
  }

  addToResource(
    playerId: string,
    resourceType: string,
    amount: number,
  ): ResourceUpdate {
    const playerData = this.playerResources.get(playerId);
    if (!playerData) {
      throw new Error(`Player ${playerId} not found`);
    }

    const resource = playerData.resources.find((r) => r.type === resourceType);
    if (!resource) {
      throw new Error(
        `Resource ${resourceType} not found for player ${playerId}`,
      );
    }

    const oldAmount = resource.amount;
    const newAmount = oldAmount + amount;
    resource.amount = newAmount;
    resource.updatedAt = new Date();
    playerData.updatedAt = new Date();

    return {
      playerId,
      resourceType,
      oldAmount,
      newAmount,
      updatedAt: new Date(),
    };
  }

  // Симуляция автоматического пополнения ресурсов
  simulateResourceGeneration() {
    for (const [playerId, playerData] of this.playerResources.entries()) {
      for (const resource of playerData.resources) {
        if (resource.type !== 'diamond') {
          // Алмазы не пополняются автоматически
          const increment = Math.floor(Math.random() * 100) + 1;
          resource.amount += increment;
          resource.updatedAt = new Date();
        }
      }
      playerData.updatedAt = new Date();
    }
  }
}
