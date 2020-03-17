import { writable } from 'svelte/store';

export const pullRequests = writable([]);

pullRequests.subscribe((value) => {
  console.log('PullRequests:', value);
});

fetch('http://localhost:5001/list')
  .then(response => response.json())
  .then(result => pullRequests.set(result));
