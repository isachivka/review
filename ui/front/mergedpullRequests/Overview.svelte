<script>
  import { mergedPullRequests } from '../store';
  import groupBy from 'lodash/groupBy';
  import sortBy from 'lodash/sortBy';
  import { writable, derived } from 'svelte/store';
  import Merger from './Merger.svelte';

  const mergers = derived(
    [mergedPullRequests],
    ([$mergedPullRequests]) => {
      return sortBy(
        Object.values(
          groupBy($mergedPullRequests, (pr) => pr.mergedBy.login)
        ),
        e => e.length
      ).reverse();
    },
  );

  $: console.log($mergers);
</script>

<div class="flex">
  {#each $mergers as merger}
    <Merger merger={merger} total={$mergedPullRequests.length} />
  {/each}
</div>

<style>
  .flex {
  }
</style>
