<script>
  import MergedPullRequest from './MergedPullRequest.svelte';
  import { mergedPullRequests } from '../store';
  import { writable, derived } from 'svelte/store';

  const searchMergedRegExpString = writable(
    localStorage.getItem('searchMergedRegExpString') || ''
  );

  const filteredPullRequests = derived(
    [mergedPullRequests, searchMergedRegExpString],
    ([$mergedPullRequests, $searchMergedRegExpString]) => {
      try {
        const searchRegExp = new RegExp($searchMergedRegExpString, 'i');
        return $mergedPullRequests.map(pr => {
          return !$searchMergedRegExpString || searchRegExp.test(pr.mergedBy.login)
            ? pr
            : { ...pr, hide: true }
        })
      } catch (e) {
        console.error(e);
        return [];
      }
    }
  );

  $: localStorage.setItem('searchMergedRegExpString', $searchMergedRegExpString);
</script>

<div class="flex">
  <div class="filter">
    <label for="searchregexp">Search by mergedBy <sup>i</sup></label>
    <input id="searchregexp" type="text" bind:value={$searchMergedRegExpString}>
  </div>
  <table>
    {#each $filteredPullRequests as pullRequest}
      <MergedPullRequest pullRequest={pullRequest} />
    {/each}
  </table>
</div>

<style>
  .flex {
    display: flex;
    justify-content: space-between;
  }

  .filter {
  }

  label {
    margin-bottom: 5px;
    display: block;
  }

  input, .margined {
    margin-bottom: 10px;
  }
</style>
