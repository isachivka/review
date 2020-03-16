import {
  PullRequestsQuery,
  BranchesQuery,
} from './graphql';

export type PullRequests = Exclude<
  Exclude<PullRequestsQuery['repository'], null>['pullRequests']['nodes'],
  null
>;
export type Branches = Exclude<
  Exclude<
    Exclude<
      BranchesQuery['repository'], null
    >['refs'],
    null
  >['nodes'],
  null
>;
