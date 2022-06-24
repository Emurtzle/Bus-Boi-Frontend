import { GraphQLClient } from 'graphql-request';

export const API_URL = 'https://localhost:44314/graphql/';

export const graphQLClient = new GraphQLClient(API_URL);
