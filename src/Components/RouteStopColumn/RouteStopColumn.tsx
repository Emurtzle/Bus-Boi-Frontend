import { useRemoveWatchedRouteStopMutation } from '../../GraphQL/MutationHooks/UseRemoveWatchedRouteStop';
import { useGetWrsForUser } from '../../GraphQL/QueryHooks/UseGetWrsForUser';
import { Stop } from '../../Models/Stop';
import { WatchedRouteStop, WatchedRouteStops } from '../../Models/WatchedRouteStop';
import WatchedRouteStopCard, { WatchedRouteStopCardType } from './WatchedRouteStopCard';

function RouteStopColumn({ setShowPopup, setShowAboutPage }: RouteStopColumnProps) {
  const removeWrsMutation = useRemoveWatchedRouteStopMutation('prod');
  const { data, error, isLoading, refetch } = useGetWrsForUser('prod');

  const removeWrs = (w: WatchedRouteStop) => {
    removeWrsMutation.mutate({
      routeId: w.route.routeId,
      stopId: w.stop.stopId
    });
  };

  const generateStopWrsMap = (): Map<string, WatchedRouteStop[]> => {
    const wrsMap = new Map();
    data.forEach((w: WatchedRouteStop) => {
      if (!wrsMap.has(w.stop.stopId)) {
        wrsMap.set(w.stop.stopId, [w]);
      } else {
        wrsMap.set(w.stop.stopId, [...wrsMap.get(w.stop.stopId), w]);
      }
    });
    return wrsMap;
  };

  const wrsCards = () => {
    const wrsMap = generateStopWrsMap();

    let toReturn: any = [];
    for (const [key, value] of wrsMap) {
      const wrsCard = <WatchedRouteStopCard key={key} wrss={value} removeWrs={removeWrs} />;
      toReturn = [...toReturn, wrsCard];
    }
    return toReturn;
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row flex-auto justify-start space-x-2 border-b-2 mb-2">
        <div className="flex flex-col basis-4/12">
          <div className="mt-2">
            <h1 className="text-lg font-semibold mb-2">Bus Boi v0.1</h1>
          </div>
          <button
            className="mb-2 bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-2 border border-blue-500 rounded shadow-sm hover:shadow-lg ease-linear transition-all duration-150"
            onClick={() => setShowAboutPage(true)}
          >
            About
          </button>
        </div>
        <div className="flex flex-row flex-auto basis-8/12 justify-center space-x-3">
          <button
            className="mb-2 bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-2 border border-blue-500 rounded shadow-sm hover:shadow-lg ease-linear transition-all duration-150"
            onClick={() => setShowPopup(true)}
          >
            Add Stop/Route Combination
          </button>
          <button
            className="mb-2 bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-2 border border-blue-500 rounded shadow-sm hover:shadow-lg ease-linear transition-all duration-150"
            onClick={() => refetch()}
          >
            Refresh
          </button>
        </div>
      </div>
      {!isLoading && wrsCards()}
    </div>
  );
}

export default RouteStopColumn;

type RouteStopColumnProps = {
  setShowPopup: (toggle: boolean) => void;
  setShowAboutPage: (toggle: boolean) => void;
};
