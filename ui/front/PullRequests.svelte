<script>
  import last from 'lodash/last';
  import { pullRequests } from './store';

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
      <tr>
        <td><a href={pullRequest.permalink} target="_blank">#{last(pullRequest.permalink.split('/'))}</a></td>
        <td>
          {#each pullRequest.reviews.nodes as review}
            ✅
          {/each}
        </td>
        <td>{pullRequest.title}</td>
        <td class="fixWidth">{pullRequest.baseRefName} -> {pullRequest.headRefName}</td>
      </tr>
    {/each}
  </table>
{/if}

<style>
  .table {
    margin: 0 auto;
    font-size: 18px;
  }
  .fixWidth {
    max-width: 300px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
