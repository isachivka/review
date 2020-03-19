<script>
  import groupBy from 'lodash/groupBy';
  import { branches } from '../store';
  import AuthorBranches from './AuthorBranches.svelte';
  import { getMarkdownFromGroupedBranches } from './filterBranches';

  let groupedBranches = {};
  let makeMarkdown = () => {};

  fetch('/branches')
    .then(response => response.json())
    .then(result => branches.set(result));

  function copy(event) {
    event.preventDefault();
    if (event.clipboardData) {
      event.clipboardData.setData('text/plain', makeMarkdown());
    } else if (window.clipboardData) {
      window.clipboardData.setData('Text', makeMarkdown());
    }
  }

  window.addEventListener('copy', copy);

  $: {
    groupedBranches = Object.values(groupBy($branches, 'github'));
  }

  $: makeMarkdown = () => getMarkdownFromGroupedBranches(groupBy($branches, 'github'));

  const onClick = () => document.execCommand('copy');
</script>

<div class="wrapper">
  <button class="button" on:click={onClick}>copy markdown</button>
  {#each groupedBranches as branchesByAuthor}
    <AuthorBranches authorBranches={branchesByAuthor} />
  {/each}
</div>

<style>
  .wrapper {
    max-width: 827px;
    position: relative;
    margin: 0 auto;
  }
  .button {
    position: absolute;
    right: 50px ;
    background: #4cdfff;
    display: block;
    padding: 9px 10px 11px;
    border-radius: 10px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
  }

  .button:hover {
    background: #3cc5e4;
  }
</style>
