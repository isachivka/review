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

<div class="wrapper">
  {#if $pullRequests}
    <table class="table">
      {#each $pullRequests as pullRequest}
        <PullRequest pullRequest={pullRequest} />
      {/each}
    </table>
  {/if}
</div>

<style>
  .wrapper {
    max-width: 827px;
    position: relative;
    margin: 0 auto;
  }

  .table {
    margin: 20px 0 20px 0;
    max-width: 827px;
  }
</style>
