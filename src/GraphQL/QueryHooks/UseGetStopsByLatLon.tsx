import { useQuery } from 'react-query';
import { graphQLClient } from '../ClientService';
import { GET_STOPS_BY_LAT_LON } from '../Queries/GetStopsByLatLon.Query';

export function useGetStopsByLatLon(lat: number, lon: number) {
  return useQuery(
    ['get-stops-by-lat-lon', lat, lon],
    async () => {
      const { stopsByLatLon } = await graphQLClient.request(
        GET_STOPS_BY_LAT_LON,
        { lat, lon }
      );
      return stopsByLatLon;
    },
    { refetchOnWindowFocus: false, refetchOnMount: false }
  );
}
