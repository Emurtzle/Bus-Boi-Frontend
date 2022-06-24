import { useState } from 'react';
import { useGetWrsForUser } from '../../GraphQL/QueryHooks/UseGetWrsForUser';
import MainMapContainer from '../MainMap/MainMapContainer';
import Popup from '../Popup/Popup';
import RouteStopColumn from '../RouteStopColumn/RouteStopColumn';
import AboutPage from './AboutPage';

const Main = (): JSX.Element => {
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([47.57753, -122.2956]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showAboutPage, setShowAboutPage] = useState<boolean>(false);

  return (
    <div>
      <div className="flex flex-row h-screen">
        <div className="basis-2/3 flex-auto">
          <MainMapContainer currentPosition={currentPosition} />
        </div>
        <div className="basis-1/3 flex-auto p-3" style={{ overflowY: 'scroll' }}>
          <RouteStopColumn setShowAboutPage={setShowAboutPage} setShowPopup={setShowPopup} />
        </div>
      </div>
      {showPopup && (
        <Popup currentPosition={currentPosition} setCurrentPosition={setCurrentPosition} setShowPopup={setShowPopup} />
      )}
      {showAboutPage && <AboutPage setShowAboutPage={setShowAboutPage} />}
    </div>
  );
};

export default Main;
