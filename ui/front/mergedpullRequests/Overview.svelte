<script>
  import { mergedPullRequests } from '../store';
  import groupBy from 'lodash/groupBy';
  import sortBy from 'lodash/sortBy';
  import uniqBy from 'lodash/uniqBy';
  import find from 'lodash/find';
  import { writable, derived } from 'svelte/store';
  import Merger from './Merger.svelte';
  import Reviewer from './Reviewer.svelte';

  const mergers = derived(
    [mergedPullRequests],
    ([$mergedPullRequests]) => {
      return sortBy(
        Object.values(
          groupBy($mergedPullRequests, (pr) => pr.mergedBy.login),
        ),
        e => e.length,
      ).reverse();
    },
  );

  const reviewers = derived(
    [mergedPullRequests],
    ([$mergedPullRequests]) => {
      const groupped = $mergedPullRequests.reduce((acc, pullRequest) => {
        pullRequest.reviews.nodes.forEach(review => {
          if (review.author.login === pullRequest.author.login) {
            return;
          }
          acc[review.author.login] = uniqBy([
            ...(acc[review.author.login] || []),
            pullRequest,
          ], 'permalink');
        });

        return acc;
      }, {});

      const grouppedArray = Object.keys(groupped).map((login) => {
        return {
          user: find(
            groupped[login][0].reviews.nodes, node => node.author.login === login
          ).author,
          pullRequests: groupped[login],
        };
      });

      return sortBy(grouppedArray, (group) => group.pullRequests.length).reverse();
    },
  );

  $: console.log($mergers);
  $: console.log($reviewers);
</script>

<div class="flex">
  <h2>Mergers</h2>
  {#each $mergers as merger}
    <Merger merger={merger} total={$mergedPullRequests.length} />
  {/each}
</div>

<hr />

<div class="flex">
  <h2>Reviewers</h2>
  {#each $reviewers as reviewer}
    <Reviewer total={$mergedPullRequests.length} reviewer={reviewer} />
  {/each}
</div>

<style>
  .flex {
  }

  hr {
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, .3);
    margin: 20px 0 25px;
  }
</style>
