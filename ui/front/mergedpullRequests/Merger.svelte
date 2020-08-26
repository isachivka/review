<script>
  export let person;
  export let total;

  import { link } from 'svelte-routing';

  function onMouseDown() {
    localStorage.setItem('searchMergedRegExpString', person.user.login);
  }
</script>

<div class="merger">
  <div class="left">
    <img src={person.user.avatarUrl}>
  </div>
  <div class="right">
    <div>{person.user.login} </div>
    <span class="total">
      <span class="user" style={`width: ${person.mergedBy.length / total * 100}%`} />
      <span class="user c1" style={`width: ${person.createdBy.length / total * 100}%`} />
      <span class="user c2" style={`width: ${person.reviewedBy.length / total * 100}%`} />
    </span>
    <div>
      <a on:mousedown={onMouseDown} use:link href="/merged/timeline">
        merge {person.mergedBy.length} pull requests
      </a>
      <div>create {person.createdBy.length} pull requests</div>
      <div>review {person.reviewedBy.length} pull requests</div>
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
    overflow: hidden;
    display: block;
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
    height: 32px;
    border-radius: 3px;
  }

  span.user {
    height: 6px;
    display: block;
    background: #25c560;
    border-radius: 3px;
    margin-bottom: 5px;
    min-width: 7px;
  }

  span.user.c1 { background: #d4cc23; }
  span.user.c2 { background: #2585c5; }

  a {
    color: #fff;
  }
</style>
