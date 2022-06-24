import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { RouteStop } from '../../Models/RouteStop';
import { Stops } from '../../Models/Stop';
import StopMarker from './StopMarker';

export default function PopupMapContainer({
  stops,
  currentPosition,
  softAddRouteStop,
  setCurrentPosition
}: PopupMapContainerProps) {
  const markers = stops.map((stop, index) => (
    <StopMarker
      key={index}
      position={[stop.latitude, stop.longitude]}
      stop={stop}
      softAddRouteStop={softAddRouteStop}
    />
  ));

  return (
    <div className="h-full">
      <MapContainer
        center={currentPosition}
        zoom={13}
        scrollWheelZoom={true}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DoubleClickComponent setCurrentPosition={setCurrentPosition} />
        {markers}
      </MapContainer>
    </div>
  );
}

type PopupMapContainerProps = {
  stops: Stops;
  currentPosition: [number, number];
  softAddRouteStop: (routeStop: RouteStop) => void;
  setCurrentPosition: (position: [number, number]) => void;
};

function DoubleClickComponent({
  setCurrentPosition
}: DoubleClickComponentProps) {
  const map = useMapEvents({
    dblclick: (event) => {
      setCurrentPosition([event.latlng.lat, event.latlng.lng]);
    }
  });
  return null;
}

type DoubleClickComponentProps = {
  setCurrentPosition: (position: [number, number]) => void;
};
