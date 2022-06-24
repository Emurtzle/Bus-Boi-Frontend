import { gql } from 'graphql-request';

export const GET_STOPS_BY_LAT_LON = gql`
  query GetStopByLatLon($lat: Float!, $lon: Float!) {
    stopsByLatLon(lat: $lat, lon: $lon) {
      id
      stopId
      name
      direction
      latitude
      longitude
      routes {
        id
        routeId
        longName
        shortName
        description
      }
    }
  }
`;
