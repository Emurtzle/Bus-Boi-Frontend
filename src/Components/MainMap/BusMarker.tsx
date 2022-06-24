import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { Marker, Tooltip } from 'react-leaflet';
import bus from '../../SVGs/BusSvg.svg';

function BusMarker({ routeStops }: BusMarkerProps) {
  const iconContent = () => {
    if (routeStops.length == 1) {
      return (
        <div className="flex flex-col justify-center items-start">
          {routeStops.map((rss, index) => (
            <div className=" rounded-full" style={{ backgroundColor: routeStops[0].color }}>
              <p className=" text-base font-bold p-1 text-white">{routeStops[0].shortName}</p>
            </div>
          ))}
          <img src={bus} alt="Bus Marker" style={{ width: '30px', height: '30px' }} />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col justify-center items-start">
          <div className="flex flex-row space-x-2">
            {routeStops.map((rs, index) => (
              <div key={rs.color + index} className=" rounded-full" style={{ backgroundColor: rs.color }}>
                <p className=" text-base font-bold p-1 text-white">{rs.shortName}</p>
              </div>
            ))}
          </div>
          <img src={bus} alt="Bus Marker" style={{ width: '30px', height: '30px' }} />
        </div>
      );
    }
  };

  const width = routeStops.length * 30;

  const icon = new L.DivIcon({
    html: ReactDOMServer.renderToString(iconContent()),
    iconAnchor: [0, 0],
    className: 'MainMap-Bus-DivIcon'
  });

  return <Marker zIndexOffset={100} position={routeStops[0].position} icon={icon}></Marker>;
}

export type routeStop = {
  shortName: string;
  color: string;
  timeRemaining: string;
  position: [number, number];
};

type BusMarkerProps = {
  routeStops: routeStop[];
};

export default BusMarker;
