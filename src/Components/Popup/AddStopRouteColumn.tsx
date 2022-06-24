import { RouteStop, RouteStops } from '../../Models/RouteStop';

export default function AddStopRouteColumn({
  routeStopsToAdd,
  softRemoveRouteStop
}: AddStopRouteColumnProps) {
  const stopRouteCards = routeStopsToAdd.map((stopRoute, index) => (
    <SoftAddRouteStopCard
      key={index}
      routeStop={stopRoute}
      softRemoveRouteStop={softRemoveRouteStop}
    />
  ));

  return (
    <div className="flex flex-col justify-center">
      {routeStopsToAdd.length > 0 ? (
        stopRouteCards
      ) : (
        <p className="text-base font-semibold text-center border-b">
          Click a marker to add a stop and route combination to monitor
        </p>
      )}
    </div>
  );
}

type AddStopRouteColumnProps = {
  routeStopsToAdd: RouteStops;
  softRemoveRouteStop: (routeStop: RouteStop) => void;
};

function SoftAddRouteStopCard({
  routeStop,
  softRemoveRouteStop
}: SoftAddRouteStopCardProps) {
  return (
    <div className="flex flex-row justify-between ml-2 border-b border-solid py-1">
      <div className="flex flex-col basis-3/4">
        <h3 className="text-base font-semibold">
          Route: {routeStop.Route.shortName}
        </h3>
        <h3 className="text-base font-semibold">Stop: {routeStop.Stop.name}</h3>
      </div>
      <div className="flex flex-col basis-1/4 justify-end">
        <button
          className=" bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-1 py-1 mx-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => softRemoveRouteStop(routeStop)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

type SoftAddRouteStopCardProps = {
  routeStop: RouteStop;
  softRemoveRouteStop: (routeStop: RouteStop) => void;
};
