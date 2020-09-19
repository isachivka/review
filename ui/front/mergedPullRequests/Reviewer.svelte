<script>
  import { writable } from 'svelte/store';
  import last from 'lodash/last';

  export let reviewer;
  export let total;

  const expand = writable(false);

  function onClick() {
    expand.set(!$expand);
  }

  const style = `width: ${reviewer.pullRequests.length / total * 100}%`;
</script>

<div class="merger">
  <div class="left">
    <img src={reviewer.user.avatarUrl} alt={reviewer.user.login}>
  </div>
  <div class="right">
    <div>{reviewer.user.login} review {reviewer.pullRequests.length} pull requests</div>
    <span class="total">
      <span class="user" style={style} />
    </span>
    <div>
      <button on:click={onClick}>
        {#if $expand}hide{:else}show{/if} list
      </button>
    </div>
    {#if $expand}
      <table class="list">
        {#each reviewer.pullRequests as pr}
          <tr>
            <td><a title="{pr.title}" href={pr.permalink}>{last(pr.permalink.split('/'))}</a></td>
            <td>{pr.author.login}</td>
          </tr>
        {/each}
      </table>
    {/if}
  </div>
</div>



<style>
  .merger {
    display: flex;
    margin-bottom: 10px;
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 60px;
  }
  .left {
    width: 80px;
  }
  .right {
    width: 100%;
  }

  span.total {
    margin: 4px 0;
    display: block;
    width: 100%;
    height: 6px;
    border-radius: 3px;
  }

  span.user {
    height: 6px;
    display: block;
    background: #b425c5;
    border-radius: 3px;
  }

  a {
    color: #fff;
  }

  .list {
    table-layout: fixed;
    margin-top: 10px;
  }
  .list td {
    white-space: nowrap;
    padding: 2px 0;
  }
  .list td:nth-child(2) {
    overflow: hidden;
    max-width: 200px;
    width: 200px;
    padding-left: 30px;
    padding-right: 30px;
    text-overflow: ellipsis;
  }
  button {
    border: none;
    background: none;
    font-size: 16px;
    padding: 0;
    margin: 0;
  }
</style>
