<script>
  export let value;
  export let type;
</script>

{#if type === 'ci'}
  <span
    class={
      'badge ' + type + ' ' + value
    }
  >
  </span>
{:else}
  <span
    class={
      value
        ? 'badge active ' + type
        : 'badge ' + type
    }
  >
    <span>x{value && value.length || 0}</span>
  </span>
{/if}

<style>

  .badge, .badge > * {
    box-sizing: border-box;
  }
  .badge {
    background: #616567;
    opacity: 0.5;
    border-radius: 100px;
    font-size: 10px;
    padding: 2px 2px 2px 7px;
    height: 22px;
    line-height: 17px;
    /*line-height: 20px;*/
    display: inline-block;
  }

  .ci:before {
    content: 'CI';
    padding-right: 7px;
  }
  .change:before {
    content: 'Change ';
  }
  .approve:before {
    content: 'Approved ';
  }


  .ci.SUCCESS {
    background: #186419;
    opacity: 1;
  }
  .ci.FAILURE {
    background: #903e28;
    opacity: 1;
  }
  .approve.active {
    background: #186419;
    opacity: 1;
  }
  .change.active {
    background: #903e28;
    opacity: 1;
  }

  .badge span {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 100%;
    height: 18px;
    width: 18px;
    text-align: center;
    display: inline-block;
  }

  .badge.active span {

  }
</style>
