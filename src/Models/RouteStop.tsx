import { Stop } from './Stop';
import { Route } from './Route';

export interface RouteStop {
  Stop: Stop;
  Route: Route;
}

export type RouteStops = RouteStop[];
