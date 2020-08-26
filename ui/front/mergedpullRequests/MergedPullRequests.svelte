<script>
  import sortBy from 'lodash/sortBy';
  import { Router, link, Route } from 'svelte-routing';
  import { mergedPullRequests } from '../store';
  import Timeline from './Timeline.svelte';
  import Overview from './Overview.svelte';

  fetch('/mergedPrs')
    .then(response => response.json())
    .then(result => mergedPullRequests.set(sortBy(result, 'mergedAt').reverse()));

  $: console.log('MergedPullRequests:', $mergedPullRequests);
</script>

<Router>
  <div class="wrapper">
    {#if $mergedPullRequests}
      <ul class="menu">
        <li><a use:link href="/merged/timeline"><h3>Timeline <sup>(2 weeks)</sup></h3></a></li>
        <li><a use:link href="/merged/overview"><h3>Overview <sup>&nbsp;</sup></h3></a></li>
      </ul>

      <Route path="timeline" component={Timeline} />
      <Route path="overview" component={Overview} />
    {/if}
  </div>
</Router>

<style>
  .wrapper {
    max-width: 827px;
    position: relative;
    margin: 0 auto;
  }

  ul.menu {
    list-style: none;
    display: flex;
    margin: 0 0 10px;
    padding: 0;
  }

  ul.menu li {
    margin-right: 20px;
  }

  ul.menu li a {
    text-decoration: none;
    color: #fff;
    display: block;
  }

  ul.menu li a:hover {
    opacity: 0.8;
  }
</style>
