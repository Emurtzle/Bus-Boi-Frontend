export interface WatchedBus {
  tripId: string;
  status: string;
  longitude: number;
  latitude: number;
  scheduledArrivalTime: number;
}

export type WatchedBusses = WatchedBus[];
