import { gql } from 'apollo-boost';

export default gql`
  query PullRequests($owner: String!, $repository: String!) {
    repository(owner: $owner, name: $repository) {
      pullRequests(first: 100, states: OPEN) {
        nodes {
          permalink
          title
          baseRefName
          headRefName
          reviews(states: APPROVED, last: 10) {
            nodes {
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
