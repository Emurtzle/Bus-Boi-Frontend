import { MapContainer, TileLayer } from 'react-leaflet';
import { useGetWrsForUser } from '../../GraphQL/QueryHooks/UseGetWrsForUser';
import { WatchedRouteStop } from '../../Models/WatchedRouteStop';
import BusMarkerContainer from './BusMarkerContainer';
import BusStopMarker from './BusStopMarker';
import BusStopMarkerContainer from './BusStopMarkerContainer';

function MainMapContainer({ currentPosition }: MainMapContainerProps) {
  return (
    <div className="h-full">
      <MapContainer center={currentPosition} zoom={13} scrollWheelZoom={true} doubleClickZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <BusStopMarkerContainer />
        <BusMarkerContainer />
      </MapContainer>
    </div>
  );
}

export default MainMapContainer;

type MainMapContainerProps = {
  currentPosition: [number, number];
};
