import moment from 'moment';
import { useRemoveWatchedRouteStopMutation } from '../../GraphQL/MutationHooks/UseRemoveWatchedRouteStop';
import { Stop } from '../../Models/Stop';
import { WatchedBus } from '../../Models/WatchedBus';
import { WatchedRouteStop } from '../../Models/WatchedRouteStop';

function WatchedRouteStopCard({ wrss, removeWrs }: WatchedRouteStopCardProps) {
  const routeSections = () =>
    wrss.map((wrs) => (
      <div key={wrs.id} className="flex flex-row">
        <div className="flex basis-2/12 rounded-md justify-center" style={{ backgroundColor: wrs.color }}>
          <p className="text-base font-bold text-white p-2 self-center">{wrs.route.shortName}</p>
        </div>
        <div className="flex flex-col basis-9/12">
          {wrs.watchedBusses.length > 0 ? (
            wrs.watchedBusses.map((wb, index) => <IncomingBusCard key={wrs.id + '-' + index} incomingBus={wb} />)
          ) : (
            <p className="text-base font-semibold p-2">No Incoming Busses</p>
          )}
        </div>
        <div className="flex basis-1/12 justify-end">
          <button
            className="font-bold text-red-500 hover:text-white hover:border rounded background-transparent hover:bg-red-500 shadow-sm hover:shadow-lg"
            onClick={() => removeWrs(wrs)}
          >
            X
          </button>
        </div>
      </div>
    ));

  return (
    <div className="flex flex-col border-b-2 space-y-2">
      <div className="flex flex-row">
        <div className="basis-11/12">
          <p className="text-base font-semibold">
            {wrss[0].stop.name} : {wrss[0].stop.direction}
          </p>
        </div>
      </div>
      {routeSections()}
    </div>
  );
}

export default WatchedRouteStopCard;
export type WatchedRouteStopCardType = typeof WatchedRouteStopCard;

type WatchedRouteStopCardProps = {
  wrss: WatchedRouteStop[];
  removeWrs: (w: WatchedRouteStop) => void;
};

function IncomingBusCard({ incomingBus }: IncomingBusCardProps) {
  const arrivalTime = moment(incomingBus.scheduledArrivalTime);
  const remainingTime = moment.duration(arrivalTime.diff(moment.now()));
  const timeRemainingString = remainingTime.format('m');

  return (
    // <div className='basis-1/4'></div>
    <div className="flex flex-row flex-auto basis-11/12 justify-between">
      <h4 className=" text-sm font-semibold ml-2">Arriving: {arrivalTime.format('hh:mm')}</h4>
      <h4 className="text-sm font-semibold">{timeRemainingString} minutes away</h4>
    </div>
  );
}

type IncomingBusCardProps = {
  incomingBus: WatchedBus;
};
