import { gql } from 'graphql-request';

export const SUBMIT_WATCHED_ROUTE_STOP = gql`
  mutation SUBMITWATCHEDROUTESTOP(
    $routeId: String!
    $stopId: String!
    $userName: String!
    $hexColor: String!
  ) {
    addWatchedRouteStop(
      routeId: $routeId
      stopId: $stopId
      userName: $userName
      hexColor: $hexColor
    ) {
      id
      color
      route {
        id
        routeId
        shortName
        longName
        description
      }
      stop {
        id
        name
        stopId
      }
      watchedBusses {
        status
        longitude
        latitude
        scheduledArrivalTime
      }
    }
  }
`;
