<script>
  export let pullRequest;

  import last from 'lodash/last';
  import uniq from 'lodash/uniq';
  import FromTo from '../pullRequests/FromTo.svelte';

  let age,
    prNumber,
    reviewers;

  $: age = parseInt(
    (Date.now() - new Date(pullRequest.mergedAt)) / 1000 / 60 / 60 / 24,
  );
  $: prNumber = last(pullRequest.permalink.split('/'));
  $: {
    reviewers = uniq(pullRequest.reviews.nodes.map(node => {
      return node.author.login
    }));
  }
</script>

<tr
  class:hide="{pullRequest.hide}"
>
  <td><a href={pullRequest.permalink} target="_blank">#{prNumber}</a></td>
  <td class="second">{age} days ago</td>
  <td><FromTo pullRequest={pullRequest} /></td>
  <td><div class="login">{pullRequest.mergedBy.login}</div></td>
  <td>
    {#if reviewers.length > 0}
      <span title="{reviewers}">🍪</span>
    {/if}
  </td>
</tr>

<style>
  .hide {
    display: none;
  }

  .login {
    width: 120px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .second {
    padding: 0 10px;
  }
</style>
