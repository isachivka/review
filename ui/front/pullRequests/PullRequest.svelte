<script>
  export let hide;

  import last from 'lodash/last';
  import groupBy from 'lodash/groupBy';
  import Badge from './Badge.svelte';
  import FromTo from './FromTo.svelte';

  export let pullRequest;

  let prNumber,
    reviews,
    age,
    ciStatus;

  $: reviews = groupBy(pullRequest.reviews.nodes, 'state');

  $: ciStatus = pullRequest.commits.nodes[0].commit.status.state;
  $: prNumber = last(pullRequest.permalink.split('/'));
  $: age = parseInt(
    (Date.now() - new Date(pullRequest.createdAt)) / 1000 / 60 / 60 / 24,
  );
</script>

<tr
  class:passive="{pullRequest.hide}"
  class:hide={$hide}
>
  <td>
    <a href={pullRequest.permalink} target="_blank">#{prNumber}</a>
  </td>
  <td class="second">{age} days</td>
  <td><FromTo pullRequest={pullRequest} /></td>
  <td><Badge value={reviews.APPROVED} type="approve" /></td>
  <td><Badge value={reviews.CHANGES_REQUESTED} type="change" /></td>
  <td><Badge value={ciStatus} type="ci" /></td>
</tr>

<style>
  .passive {
    opacity: 0.3;
  }
  .passive.hide {
    display: none;
  }
  .second {
    padding: 0 10px;
  }
</style>
