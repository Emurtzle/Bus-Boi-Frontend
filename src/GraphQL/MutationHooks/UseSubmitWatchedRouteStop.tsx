import { useMutation, useQueryClient } from 'react-query';
import { RouteStop } from '../../Models/RouteStop';
import { graphQLClient } from '../ClientService';
import { SUBMIT_WATCHED_ROUTE_STOP } from '../Mutations/SubmitWatchedRouteStop.Mutation';

export type SubmitWatchedRouteStopParam = {
  rs: RouteStop;
  hexColor: string | undefined;
};

export const useSubmitWatchedRouteStopMutation = (username: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (param: SubmitWatchedRouteStopParam) => {
      const { addWatchedRouteStop } = await graphQLClient.request(
        SUBMIT_WATCHED_ROUTE_STOP,
        {
          routeId: param.rs.Route.routeId,
          stopId: param.rs.Stop.stopId,
          userName: username,
          hexColor: param.hexColor
        }
      );
      return addWatchedRouteStop;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['get-wrs-for-user', username]);
      }
    }
  );
};
