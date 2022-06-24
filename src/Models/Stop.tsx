import { Routes } from './Route';

export interface Stop {
  id: number;
  stopId: string;
  name: string;
  direction: string;
  latitude: number;
  longitude: number;
  routes: Routes;
}

export type Stops = Stop[];
