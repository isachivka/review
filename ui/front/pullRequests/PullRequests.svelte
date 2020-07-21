<script>
  import { writable, derived } from 'svelte/store';
  import { pullRequests } from '../store';
  import PullRequest from './PullRequest.svelte';

  fetch('/prs')
    .then(response => response.json())
    .then(result => pullRequests.set(result));

  const hide = writable(
    localStorage.getItem('hide') === 'true'
  );
  const excludeRegExpString = writable(
    localStorage.getItem('excludeRegExpString') || ''
  );
  const searchRegExpString = writable(
    localStorage.getItem('searchRegExpString') || ''
  );
  const filteredPullRequests = derived(
    [pullRequests, excludeRegExpString, searchRegExpString],
    ([$pullRequests, $excludeRegExpString, $searchRegExpString]) => {
      try {
        const excludeRegExp = new RegExp($excludeRegExpString, 'i');
        const searchRegExp = new RegExp($searchRegExpString, 'i');
        return $pullRequests
          .map(pr => {
            return !$excludeRegExpString || !excludeRegExp.test(pr.headRefName)
              ? pr
              : { ...pr, hide: true };
          })
          .map(pr => {
            return !$searchRegExpString || searchRegExp.test(pr.headRefName)
              ? pr
              : { ...pr, hide: true };
          })
      } catch (e) {
        console.error(e);
        return [];
      }
    },
  );

  $: localStorage.setItem('hide', $hide);
  $: localStorage.setItem('excludeRegExpString', $excludeRegExpString);
  $: localStorage.setItem('searchRegExpString', $searchRegExpString);

  $: console.log('PullRequests:', $pullRequests);
  $: console.log('FilteredPullRequests:', $filteredPullRequests);
</script>

<div class="wrapper">
  {#if $pullRequests}
    <div class="filter">
      <label for="searchregexp">Search by RegExp <sup>i</sup></label>
      <input id="searchregexp" type="text" bind:value={$searchRegExpString}>
      <label for="excluderegexp">Exclude by RegExp <sup>i</sup></label>
      <input id="excluderegexp" type="text" bind:value={$excludeRegExpString}>
      <label class="margined"><input type="checkbox" bind:checked={$hide}>hide/blur</label>
    </div>
    <table class="table">
      {#each $filteredPullRequests as pullRequest}
        <PullRequest hide={hide} pullRequest={pullRequest} />
      {/each}
    </table>
  {/if}
</div>

<style>
  .wrapper {
    max-width: 827px;
    position: relative;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .table {
    margin: 20px 0;
    max-width: 827px;
  }

  .filter {
    margin: 31px 0;
  }

  label {
    margin-bottom: 5px;
    display: block;
  }

  input, .margined {
    margin-bottom: 10px;
  }

</style>
