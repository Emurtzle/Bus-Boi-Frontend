import { useGetWrsForUser } from '../../GraphQL/QueryHooks/UseGetWrsForUser';
import { WatchedRouteStop } from '../../Models/WatchedRouteStop';
import BusStopMarker, { BusStopMarkerType } from './BusStopMarker';

function BusStopMarkerContainer(): JSX.Element {
  const { data, error, isLoading } = useGetWrsForUser('prod');

  const generateStopMarkers = () => {
    if (isLoading) {
      return null;
    }

    const markers = new Map();
    const assocRoutes = new Map();
    const routeStopColors = new Map();
    data.forEach((wrs: WatchedRouteStop, index: number) => {
      // Aggregate associated routes
      if (!assocRoutes.has(wrs.stop.stopId)) {
        assocRoutes.set(wrs.stop.stopId, [wrs.route]);
      } else {
        // prettier-ignore
        assocRoutes.set(wrs.stop.stopId, [...assocRoutes.get(wrs.stop.stopId), wrs.route]);
      }
      routeStopColors.set(wrs.stop.stopId + '-' + wrs.route.routeId, wrs.color);
      markers.set(
        wrs.stop.stopId,
        <BusStopMarker
          key={wrs.stop.stopId}
          stop={wrs.stop}
          routes={assocRoutes.get(wrs.stop.stopId)}
          routeStopColors={routeStopColors}
        ></BusStopMarker>
      );
    });

    let toReturn: BusStopMarkerType[] = [];

    for (const [key, value] of markers) {
      toReturn = [...toReturn, value];
    }

    return toReturn;
  };

  return <>{!isLoading && generateStopMarkers()}</>;
}

export default BusStopMarkerContainer;
