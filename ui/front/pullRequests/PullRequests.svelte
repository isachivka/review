<script>
  import { pullRequests } from '../store';
  import PullRequest from './PullRequest.svelte';

  fetch('/prs')
    .then(response => response.json())
    .then(result => pullRequests.set(result));

  $: {
    console.log('PullRequests:', $pullRequests);
  }
</script>

{#if $pullRequests}
  <table class="table">
    {#each $pullRequests as pullRequest}
      <PullRequest pullRequest={pullRequest} />
    {/each}
  </table>
{/if}

<style>
  .table {
    margin: 20px auto;
    max-width: 827px;
  }
</style>
