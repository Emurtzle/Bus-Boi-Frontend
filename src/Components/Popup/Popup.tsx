import { useState } from 'react';
import { useMutation } from 'react-query';
import { WRSColorArray } from '../../Constants/AvailableColorsForWatchedRouteStops';
import { useSubmitWatchedRouteStopMutation } from '../../GraphQL/MutationHooks/UseSubmitWatchedRouteStop';
import { useGetStopsByLatLon } from '../../GraphQL/QueryHooks/UseGetStopsByLatLon';
import { useGetWrsForUser } from '../../GraphQL/QueryHooks/UseGetWrsForUser';
import { Route } from '../../Models/Route';
import { RouteStop, RouteStops } from '../../Models/RouteStop';
import { Stop } from '../../Models/Stop';
import { WatchedRouteStop } from '../../Models/WatchedRouteStop';
import AddStopRouteColumn from './AddStopRouteColumn';
import PopupMapContainer from './PopupMapContainer';

export default function Popup({ currentPosition, setCurrentPosition, setShowPopup }: PopupProps) {
  const [routeStopsToAdd, setRouteStopsToAdd] = useState<RouteStops>([]);
  const { data, error, isLoading } = useGetStopsByLatLon(currentPosition[0], currentPosition[1]);
  const { data: wrsData, error: wrsError, isLoading: wrsIsLoading } = useGetWrsForUser('prop');
  const submitWrsMutation = useSubmitWatchedRouteStopMutation('prod');

  const softAddRouteStop = (routeStop: RouteStop) => {
    let exists = false;
    routeStopsToAdd.forEach((x) => {
      if (x.Route.routeId === routeStop.Route.routeId && x.Stop.stopId === routeStop.Stop.stopId) {
        exists = true;
      }
    });
    if (!exists) {
      setRouteStopsToAdd([...routeStopsToAdd, routeStop]);
    }
  };

  const softRemoveRouteStop = (routeStop: RouteStop) => {
    const newRouteStops = routeStopsToAdd.filter(
      (x) => x.Route.routeId !== routeStop.Route.routeId && x.Stop.stopId !== routeStop.Stop.stopId
    );
    setRouteStopsToAdd(newRouteStops);
  };

  const addWatchedRouteStops = (routeStops: RouteStops) => {
    const availableColors = WRSColorArray;

    wrsData.forEach((wrs: WatchedRouteStop) => {
      availableColors.filter(() => !availableColors.includes(wrs.color));
    });

    routeStops.forEach((rs) => {
      let tempColor: string | undefined = '';
      if (availableColors.length > 0) {
        tempColor = availableColors.shift();
      } else {
        tempColor = Math.floor(Math.random() * 16777215).toString(16);
      }
      submitWrsMutation.mutate({
        hexColor: tempColor,
        rs: rs
      });
    });
    setShowPopup(false);
  };

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-4/5 h-4/5 my-6 mx-auto">
        {/* Content */}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">Add Route/Stop Combinations</h3>
          </div>
          {/* Body */}
          <div className="relative p-6 flex-auto">
            <div className="flex flex-row w-full h-full">
              <div className="basis-2/3">
                <PopupMapContainer
                  stops={!isLoading ? data : []}
                  currentPosition={currentPosition}
                  softAddRouteStop={softAddRouteStop}
                  setCurrentPosition={setCurrentPosition}
                />
              </div>
              <div className="basis-1/3">
                <AddStopRouteColumn routeStopsToAdd={routeStopsToAdd} softRemoveRouteStop={softRemoveRouteStop} />
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="flex items-center justify-end p-6 space-x-2">
            <h2 className="text-lg font-semibold py-2 mb-2">Double click the map to search for surrounding stops</h2>
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-3 mr-1 mb-1 text-sm border hover:text-white border-red-500 rounded shadow hover:shadow-lg hover:bg-red-500 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
            <button
              className="text-emerald-500 background-transparent font-bold uppercase text-sm px-6 py-3 border hover:text-white rounded shadow hover:shadow-lg border-emerald-500 hover:bg-emerald-500 mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => addWatchedRouteStops(routeStopsToAdd)}
            >
              Add Route/Stops
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type PopupProps = {
  currentPosition: [number, number];
  setCurrentPosition: (position: [number, number]) => void;
  setShowPopup: (toggle: boolean) => void;
};
