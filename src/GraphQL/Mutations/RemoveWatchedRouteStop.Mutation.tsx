import { gql } from 'graphql-request';

export const REMOVE_WATCHED_ROUTE_STOP = gql`
  mutation REMOVEWATCHEDROUTESTOP(
    $username: String!
    $routeId: String!
    $stopId: String!
  ) {
    removeWatchedRouteStop(
      username: $username
      routeId: $routeId
      stopId: $stopId
    ) {
      id
    }
  }
`;
