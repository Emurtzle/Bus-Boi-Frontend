import moment from 'moment';
import { useGetWrsForUser } from '../../GraphQL/QueryHooks/UseGetWrsForUser';
import { WatchedBus } from '../../Models/WatchedBus';
import { WatchedRouteStop } from '../../Models/WatchedRouteStop';
import BusMarker, { routeStop } from './BusMarker';
import 'moment-duration-format';
import { stringify } from 'querystring';

function BusMarkerContainer() {
  const { data, error, isLoading } = useGetWrsForUser('prod');

  const generateBusMarkers = () => {
    if (isLoading) {
      return null;
    }

    const busMap = new Map();

    data.forEach((wrs: WatchedRouteStop) => {
      wrs.watchedBusses.forEach((wb) => {
        const arrivalTime = moment(wb.scheduledArrivalTime);
        const remainingTime = moment.duration(arrivalTime.diff(moment.now()));
        const timeRemainingString = remainingTime.format('hh:mm');
        const routeStop: routeStop = {
          shortName: wrs.route.shortName,
          color: wrs.color,
          timeRemaining: timeRemainingString,
          position: [wb.latitude, wb.longitude]
        };
        if (!busMap.has(wb.tripId)) {
          busMap.set(wb.tripId, [routeStop]);
        } else {
          busMap.set(wb.tripId, [...busMap.get(wb.tripId), routeStop]);
        }
      });
    });

    let toReturn: JSX.Element[] = [];
    for (const [key, value] of busMap) {
      const busMarker = <BusMarker key={key} routeStops={value} />;
      toReturn = [...toReturn, busMarker];
    }
    return toReturn;
  };

  return <>{!isLoading && generateBusMarkers()}</>;
}

export default BusMarkerContainer;
