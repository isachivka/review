import { writable } from 'svelte/store';
import { PullRequests, Branches } from '@review/github-fetch/src/types/shared';
import { AnyEvent } from '@review/events/src/events/types';

export const pullRequests = writable<PullRequests>([]);
export const mergedPullRequests = writable<PullRequests>([]);
export const branches = writable<Branches>([]);
export const events = writable<AnyEvent[]>([]);
export const stacktrace = writable([]);
