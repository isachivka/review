<script>
  import { mergedPullRequests } from '../store';
  import uniqBy from 'lodash/uniqBy';
  import _sortBy from 'lodash/sortBy';
  import { writable, derived } from 'svelte/store';
  import Merger from './Merger.svelte';

  const sortBy = writable('createdBy');

  const getInitial = (user) => ({
    user,
    createdBy: [],
    mergedBy: [],
    reviewedBy: [],
  })

  function onClickSort(newSortBy) {
    return () => {
      $sortBy = newSortBy;
    };
  }
  const onClickSortByCreated = onClickSort('createdBy');
  const onClickSortByMerged = onClickSort('mergedBy');
  const onClickSortByReviewed = onClickSort('reviewedBy');

  const overview = derived(
    [mergedPullRequests, sortBy],
    ([$mergedPullRequests, $sortBy]) => {
      const result = $mergedPullRequests.reduce((acc, pullRequest) => {

        if (!acc[pullRequest.author.login]) acc[pullRequest.author.login] = getInitial(pullRequest.author);
        const createdBy = acc[pullRequest.author.login].createdBy;
        acc[pullRequest.author.login].createdBy = [...createdBy, pullRequest];

        if (!acc[pullRequest.mergedBy.login]) acc[pullRequest.mergedBy.login] = getInitial(pullRequest.mergedBy);
        const mergedBy = acc[pullRequest.mergedBy.login].mergedBy;
        acc[pullRequest.mergedBy.login].mergedBy = [...mergedBy, pullRequest];

        pullRequest.reviews.nodes.forEach(review => {
          if (review.author.login === pullRequest.author.login) return;

          if (!acc[review.author.login]) acc[review.author.login] = getInitial(review.author);
          acc[review.author.login].reviewedBy = uniqBy([
            ...acc[review.author.login].reviewedBy,
            pullRequest,
          ], 'permalink');
        });

        return acc;
      }, {});

      return _sortBy(Object.values(result), (user) => user[$sortBy].length).reverse();
    },
  );

  $: console.log($overview);
</script>

<div class="flex">
  <ul class="sort">
    Sort by:
    <li class:active={$sortBy === 'mergedBy'} on:click={onClickSortByMerged}>merge</li>
    <li class:active={$sortBy === 'createdBy'} on:click={onClickSortByCreated}>create</li>
    <li class:active={$sortBy === 'reviewedBy'} on:click={onClickSortByReviewed}>review</li>
  </ul>
  {#each $overview as person}
    <Merger key={person.user.login} person={person} total={$mergedPullRequests.length} />
  {/each}
</div>

<style>
  .flex {
  }

  .sort {
    display: flex;
    flex-direction: row;
    margin: 0 0 30px;
    padding: 0;
  }
  .sort li {
    list-style: none;
    margin-left: 10px;
  }
  .sort li.active {
    border-bottom: 1px solid #fff;
  }

  hr {
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, .3);
    margin: 20px 0 25px;
  }
</style>
