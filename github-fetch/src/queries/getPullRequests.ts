import { gql } from 'apollo-boost';

export default gql`
  query PullRequests($owner: String!, $repository: String!) {
    repository(owner: $owner, name: $repository) {
      pullRequests(last: 100, states: OPEN) {
        nodes {
          permalink
          createdAt
          updatedAt
          title
          isDraft
          baseRefName
          headRefName
          commits(last: 1) {
            nodes {
              commit {
                status {
                  state
                }  
              }
            }
          }
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
