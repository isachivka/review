import find from 'lodash/find';
import { PullRequests } from '@review/github-fetch/src/types/shared';
import { eventsTypes, PullRequestApprovedEvent } from './types';
import { PullRequestReviewState } from '@review/github-fetch/src/types/graphql';

type Events = PullRequestApprovedEvent[];

const pullRequestApproved =
  async (prev: PullRequests, next: PullRequests): Promise<Events> => {
    return next.reduce(
      (acc: Events, pullRequest): Events => {
        if (pullRequest && pullRequest.reviews && pullRequest.reviews.nodes) {
          const events = pullRequest.reviews.nodes.reduce((eventsAcc: Events, review): Events => {
            if (!review || review.state !== PullRequestReviewState.Approved) {
              return eventsAcc;
            }

            const prevPullRequest = find(prev, { permalink: pullRequest.permalink });
            const isPrevPullRequestAlreadyHaveThisApprove =
              prevPullRequest &&
              prevPullRequest.reviews &&
              find(prevPullRequest.reviews.nodes, (rev) => {
                return (
                  rev && rev.author &&
                  review && review.author &&
                  rev.author.login === review.author.login &&
                  rev.state === PullRequestReviewState.Approved
                );
              });

            if (!prevPullRequest || !isPrevPullRequestAlreadyHaveThisApprove) {
              return [
                ...eventsAcc,
                {
                  type: eventsTypes.pullRequestApproved,
                  data: {
                    pullRequest: pullRequest,
                    by: review.author && review.author.login || '',
                  },
                }
              ];
            }

            return eventsAcc;
          }, []);

          return [
            ...acc,
            ...events,
          ];
        }

        return acc;
      },
      [],
    );
  };

export default pullRequestApproved;
