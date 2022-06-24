import { useMutation, useQueryClient } from 'react-query';
import { StringLiteralLike } from 'typescript';
import { RouteStop } from '../../Models/RouteStop';
import { graphQLClient } from '../ClientService';
import { REMOVE_WATCHED_ROUTE_STOP } from '../Mutations/RemoveWatchedRouteStop.Mutation';

export type RemoveWatchedRouteStopParam = {
  routeId: string;
  stopId: string;
};

export const useRemoveWatchedRouteStopMutation = (username: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (param: RemoveWatchedRouteStopParam) => {
      const { removeWatchedRouteStop } = await graphQLClient.request(
        REMOVE_WATCHED_ROUTE_STOP,
        {
          username: username,
          routeId: param.routeId,
          stopId: param.stopId
        }
      );
      return removeWatchedRouteStop;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['get-wrs-for-user', username]);
      }
    }
  );
};
