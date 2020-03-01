import { PullRequestsQuery } from './graphql';

export type PullRequests = Exclude<Exclude<PullRequestsQuery['repository'], null>['pullRequests']['nodes'], null>;
