import { PullRequestReviewState } from '@review/github-fetch/src/types/graphql';
import { PullRequest } from '../types';

export const pullRequestMock: PullRequest = {
  permalink: 'permalink',
  title: 'title',
  baseRefName: 'baseRefName',
  headRefName: 'headRefName',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDraft: false,
  reviews: { nodes: [] },
  commits: { nodes: [] },
};

export const pullRequestCommentedMock: PullRequest = {
  ...pullRequestMock,
  reviews: {
    nodes: [
      { author: { login: 'login' }, state: PullRequestReviewState.Commented, }
    ],
  },
};

export const pullRequestApprovedMock: PullRequest = {
  ...pullRequestMock,
  reviews: {
    nodes: [
      { author: { login: 'login' }, state: PullRequestReviewState.Approved, }
    ],
  },
};

export const bla = 1;
