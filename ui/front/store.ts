import { writable } from 'svelte/store';

export const pullRequests = writable([]);

fetch('http://bff:5001/list')
  .then(response => response.json())
  .then(result => pullRequests.set(result));
