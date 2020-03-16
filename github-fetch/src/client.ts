import config from 'config';
import ApolloClient  from 'apollo-boost';

export default new ApolloClient({
  uri: config.get('api'),
  request: (operation): void => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${config.get('token')}`,
      },
    });
  },
});

export const owner = config.get('owner') as string;
export const repository = config.get('repository') as string;
