import { useQuery } from 'react-query';
import { graphQLClient } from '../ClientService';
import { GET_WRS_FOR_USER } from '../Queries/GetWrsForUser.Query';

export function useGetWrsForUser(username: string) {
  return useQuery(
    ['get-wrs-for-user', username],
    async () => {
      const { watchedBussesForUser } = await graphQLClient.request(GET_WRS_FOR_USER, { username });
      return watchedBussesForUser;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchInterval: 15000
    }
  );
}
