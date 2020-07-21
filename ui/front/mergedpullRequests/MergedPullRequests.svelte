<script>
  import { writable, derived } from 'svelte/store';
  import sortBy from 'lodash/sortBy';
  import { mergedPullRequests } from '../store';
  import MergedPullRequest from './MergedPullRequest.svelte';

  /**
   * TODO:
   * - выделение активного пунта меню
   * - второй способ вывода - по юзерам, статистикой по датам (неделя, месяц)
   */

  fetch('/mergedPrs')
    .then(response => response.json())
    .then(result => mergedPullRequests.set(sortBy(result, 'mergedAt').reverse()));

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
  $: console.log('MergedPullRequests:', $mergedPullRequests);
</script>

<div class="wrapper">
  {#if $mergedPullRequests}
    <h3>Timeline <sup>(2 weeks)</sup></h3>
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
  {/if}
</div>

<style>
  .wrapper {
    max-width: 827px;
    position: relative;
    margin: 0 auto;
  }

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
