import { Marker, Popup } from 'react-leaflet';
import { Route } from '../../Models/Route';
import { Stop } from '../../Models/Stop';
import { RouteStop, RouteStops } from '../../Models/RouteStop';

export default function StopMarker({
  position,
  stop,
  softAddRouteStop
}: StopMarkerProps) {
  return (
    <Marker position={position}>
      <Popup>
        <div className="h-full w-full flex flex-col outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-start border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-sm font-semibold">{stop.name}</h3>
          </div>
          {/* Body */}
          <StopMarkerContent stop={stop} softAddRouteStop={softAddRouteStop} />
        </div>
      </Popup>
    </Marker>
  );
}

type StopMarkerProps = {
  position: [number, number];
  stop: Stop;
  softAddRouteStop: (routeStop: RouteStop) => void;
};

function StopMarkerContent({ stop, softAddRouteStop }: StopMarkerContentProps) {
  const routeElements = () =>
    stop.routes.map((route, index) => (
      <div
        key={index}
        className="flex flex-row items-start justify-between border-b border-solid"
      >
        <h3 className=" text-xs font-semibold pt-1">
          {route.shortName} -{' '}
          {route.description ? route.description : route.longName}
        </h3>
        <button
          className="self-end background-transparent hover:text-white text-emerald-500 hover:bg-emerald-500 font-bold uppercase text-sm px-1 py-1 mx-1 rounded shadow hover:shadow-lg border border-emerald-500 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => softAddRouteStop({ Route: route, Stop: stop })}
        >
          Add
        </button>
      </div>
    ));

  return <div className="flex flex-col">{routeElements()}</div>;
}

type StopMarkerContentProps = {
  stop: Stop;
  softAddRouteStop: (routeStop: RouteStop) => void;
};
