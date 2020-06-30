<script>
  export let hide;

  import { format } from 'date-fns';
  import last from 'lodash/last';
  import groupBy from 'lodash/groupBy';
  import Badge from './Badge.svelte';

  export let pullRequest;

  let prNumber,
    reviews,
    age,
    snf;

  $: reviews = groupBy(pullRequest.reviews.nodes, 'state');

  $: prNumber = last(pullRequest.permalink.split('/'));
  $: age = parseInt(
    (Date.now() - new Date(pullRequest.createdAt)) / 1000 / 60 / 60 / 24
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
  <td class="fixWidth">
    <span class="from">{pullRequest.headRefName}</span>
    <span class="to">{pullRequest.baseRefName}</span>
    <span class="icon" />
  </td>
  <td><Badge value={reviews.APPROVED} type="approve" /></td>
  <td><Badge value={reviews.CHANGES_REQUESTED} type="change" /></td>
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
  .fixWidth {
    width: 300px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    position: relative;
    height: 40px;
    font-size: 12px;
  }

  .fixWidth .to {
    position: absolute;
    top: 19px;
    left: calc(33px + 10px);
    z-index: 5;
  }
  .fixWidth .from {
    position: absolute;
    top: 0;
    left: calc(15px + 10px);
    z-index: 5;
  }
  .fixWidth .icon {
    position: absolute;
    top: 4px;
    left: calc(0 + 10px);
    width: 28px;
    height: 28px;
    background: linear-gradient(90deg, #b425c5, #b90e45);
    -webkit-mask: url('/images/branch.svg') no-repeat center;
    -webkit-mask-size: 28px 28px;
  }
</style>
