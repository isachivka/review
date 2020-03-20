<script>
  import first from 'lodash/first';
  import mapBranches from './filterBranches';
  export let authorBranches;

  let avatarUrl, github, branches;

  $: {
    branches = mapBranches(authorBranches);
    if (branches.length > 0) {
      avatarUrl = first(authorBranches).avatarUrl;
      github = first(authorBranches).github;
    }
  }
</script>

{#if avatarUrl}
<div class="authorBranches">
  <a href="https://github.com/{github.substr(1)}" target="_blank">
    <img class="avatar" src={avatarUrl} alt="" />
    <span>{github} ({branches.length})</span>
  </a>
  <div class="branches">
    {#each branches as branch}
      <div class="branch">
        <span class="age">age {parseInt(branch.age)} days</span>
        <span>
          {#if branch.invalid}
            <b title="invalid branch name">🆘</b>
          {/if}
          {branch.branch}
        </span>
      </div>

    {/each}
  </div>
</div>
{/if}

<style>
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    display: inline-block;
  }
  .authorBranches {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  a {
    display: inline-flex;
    margin-bottom: 10px;
  }
  a > * {
    align-self: center;
  }
  .avatar {
    margin-right: 10px;
  }
  .branch {
  }
  .branch span {
    display: inline-block;
  }
  .branch .age {
    width: 100px;
  }
</style>
