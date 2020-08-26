import { gql } from 'apollo-boost';

export default gql`
  query MergedPullRequests($query: String!) {
    search(query: $query, type: ISSUE, last: 100) {
      edges {
        node {
          ... on PullRequest {
            permalink
            title
            baseRefName
            headRefName
            mergedAt
            mergedBy {
              login
              avatarUrl
              url
            }
            author {
              login
              avatarUrl
            }
            reviews(last: 100) {
              nodes {
                author {
                  login
                  avatarUrl
                }
              }
            }
          }
        }
      }
    }
  }
`;
