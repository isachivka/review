import find from 'lodash/find';
import { PullRequests } from '@review/github-fetch/src/types/shared';
import { PullRequestCreatedEvent, eventsTypes } from './types';

const pullRequestCreated =
  async (prev: PullRequests, next: PullRequests): Promise<PullRequestCreatedEvent[]> => {
    const newPullRequests = next.filter((nextItem) => {
      if (nextItem) {
        const prevItem = find(prev, { permalink: nextItem.permalink });

        /**
         * Если PR уже был он нам не интересен
         */
        if (prevItem) {
          return false;
        }

        /**
         * Если его нет, он новый
         */
        return true;
      }

      /**
       * В nextItem может быть null, и это тоже не интересно
       */
      return false;
    });

    return newPullRequests.reduce(
      (acc: PullRequestCreatedEvent[], pullRequest): PullRequestCreatedEvent[] => {
        if (!pullRequest) return acc;

        return [
          ...acc,
          {
            type: eventsTypes.pullRequestCreated,
            data: {
              pullRequest
            },
          }
        ];
      }, []);
  };

export default pullRequestCreated;
