import L from 'leaflet';
import { Marker, Tooltip } from 'react-leaflet';
import { Routes } from '../../Models/Route';
import { Stop } from '../../Models/Stop';
import * as ReactDOMServer from 'react-dom/server';
import leftArrow from '../../SVGs/leftArrowSvg.svg';

function IconContent({ stopId, colors, routes, direction }: IconContentProps) {
  const routeCards = routes.map((route) => {
    const color = colors.get(stopId + '-' + route.routeId);
    return (
      <div key={route.routeId} className="flex justify-center mb-1">
        <p className="font-bold text-base rounded text-white p-1" style={{ backgroundColor: color }}>
          {route.shortName}
        </p>
      </div>
    );
  });

  if (goLeft(direction)) {
    return (
      <div className="flex flex-row-reverse">
        <div className="basis-1/4">
          <img
            src={leftArrow}
            className=" mr-1 mt-1"
            alt="Bus Stop Marker"
            style={{ transform: 'rotate(180deg)', width: '25px', height: '25px' }}
          />
        </div>
        <div className="basis-3/4 flex flex-row-reverse flex-wrap items-start gap-1">
          <p className="font-bold text-base rounded text-black p-1 bg-gray-300">{direction}</p>
          {routeCards}
        </div>
      </div>
    );
  } else {
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <img src={leftArrow} className=" mr-1 mt-1" alt="Bus Stop Marker" style={{ width: '25px', height: '25px' }} />
      </div>
      <div className="basis-3/4 flex flex-row flex-wrap items-start gap-1">
        <p className="font-bold text-base rounded text-black p-1 bg-gray-300">{direction}</p>
        {routeCards}
      </div>
    </div>
  );
}

type IconContentProps = {
  stopId: string;
  colors: Map<string, string>;
  routes: Routes;
  direction: string;
};

const goLeft = (direction: string): boolean =>
  direction == 'S' || direction == 'SW' || direction == 'W' || direction == 'SE';

function BusStopMarker({ stop, routes, routeStopColors }: BusStopMarkerProps) {
  const height = Math.ceil(routes.length / 2) * 40;

  const iconRight = new L.DivIcon({
    html: ReactDOMServer.renderToString(
      IconContent({
        stopId: stop.stopId,
        colors: routeStopColors,
        routes: routes,
        direction: stop.direction
      })
    ),
    iconSize: [120, height],
    iconAnchor: [0, 18],
    className: 'MainMap-BusStop-DivIcon'
  });

  const iconLeft = new L.DivIcon({
    html: ReactDOMServer.renderToString(
      IconContent({
        stopId: stop.stopId,
        colors: routeStopColors,
        routes: routes,
        direction: stop.direction
      })
    ),
    iconSize: [120, height],
    iconAnchor: [120, 18],
    className: 'MainMap-BusStop-DivIcon'
  });

  return (
    <Marker
      zIndexOffset={1}
      position={[stop.latitude, stop.longitude]}
      icon={goLeft(stop.direction) ? iconLeft : iconRight}
    >
      <Tooltip direction="left" sticky={true}>
        {stop.name}
      </Tooltip>
    </Marker>
  );
}

export default BusStopMarker;

export type BusStopMarkerType = typeof BusStopMarker;

type BusStopMarkerProps = {
  stop: Stop;
  routes: Routes;
  routeStopColors: Map<string, string>;
};
