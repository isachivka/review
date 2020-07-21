<script>
  export let merger;
  export let total;

  import { link } from 'svelte-routing';

  const login = merger[0].mergedBy.login;
  const avatarUrl = merger[0].mergedBy.avatarUrl;
  const style = `width: ${merger.length / total * 100}%`;

  function onMouseDown() {
    localStorage.setItem('searchMergedRegExpString', login);
  }
</script>

<div class="merger">
  <div class="left">
    <img src={avatarUrl} alt={login}>
  </div>
  <div class="right">
    <div>{login} merged</div>
    <span class="total">
      <span class="user" style={style} />
    </span>
    <div>
      <a on:mousedown={onMouseDown} use:link href="/merged/timeline">
        {merger.length} pull request
      </a>
    </div>
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
</style>
