import { gql } from 'graphql-request';

export const GET_WRS_FOR_USER = gql`
  query GetWrsForUser($username: String!) {
    watchedBussesForUser(username: $username) {
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
        latitude
        longitude
        direction
      }
      watchedBusses {
        tripId
        status
        longitude
        latitude
        scheduledArrivalTime
      }
    }
  }
`;
