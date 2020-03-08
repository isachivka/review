import { PullRequests } from '@review/github-fetch/src/types/shared';

export enum eventsTypes {
  pullRequestCreated = '[@pullRequestCreated]',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValuesOf<T extends any[]> = T[number];

export type PullRequest = Exclude<ValuesOf<PullRequests>, null>;

export interface PullRequestCreatedEvent {
  type: eventsTypes.pullRequestCreated;
  data: {
    pullRequest: PullRequest;
  };
}

export type AnyEvent = PullRequestCreatedEvent;

export type Error = string;

export type GeneratorResult = Error | AnyEvent[];

export type Generator = (prev: PullRequests, next: PullRequests) => Promise<GeneratorResult>;
