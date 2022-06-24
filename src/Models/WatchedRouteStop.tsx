import { Route } from './Route';
import { Stop } from './Stop';
import { WatchedBusses } from './WatchedBus';

export interface WatchedRouteStop {
	id: number;
	color: string;
	route: Route;
	stop: Stop;
	watchedBusses: WatchedBusses;
}

export type WatchedRouteStops = WatchedRouteStop[];
