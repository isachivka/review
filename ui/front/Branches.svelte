<script>
  import groupBy from 'lodash/groupBy';
  import { branches } from './store';
  import AuthorBranches from './AuthorBranches.svelte';

  let groupedBranches = {};

  fetch('/branches')
    .then(response => response.json())
    .then(result => branches.set(result));

  $: {
    groupedBranches = Object.values(groupBy($branches, 'github'));
  }
</script>

{#each groupedBranches as branchesByAuthor}
  <AuthorBranches authorBranches={branchesByAuthor} />
{/each}
