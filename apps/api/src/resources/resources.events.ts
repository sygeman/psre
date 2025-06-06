export const RESOURCE_EVENTS = {
  RESOURCE_UPDATED: 'resource/updated',
  PLAYER_RESOURCES_UPDATED: 'player/resources.updated',
  RESOURCE_GENERATED: 'resource/generated',
} as const;

export type ResourceEventData = {
  playerId: string;
  resourceType: string;
  oldAmount: number;
  newAmount: number;
  timestamp: Date;
};
