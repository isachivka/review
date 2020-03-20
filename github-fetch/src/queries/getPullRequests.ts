import { gql } from 'apollo-boost';

export default gql`
  query PullRequests($owner: String!, $repository: String!) {
    repository(owner: $owner, name: $repository) {
      pullRequests(first: 100, states: OPEN) {
        nodes {
          permalink
          createdAt
          updatedAt
          title
          baseRefName
          headRefName
          reviews(last: 10) {
            nodes {
              state
              author {
                login
              }
            }
          }
        }
      }
    }
  }
`;
