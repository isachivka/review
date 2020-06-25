import { writable } from 'svelte/store';

export const pullRequests = writable([]);
export const branches = writable([]);
export const events = writable([]);
export const stacktrace = writable([]);
