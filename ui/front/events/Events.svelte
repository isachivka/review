<script>
  import { events } from '../store';

  fetch('/events')
    .then(response => response.json())
    .then(result => events.set(result));

  $: {
    console.log('Events:', $events);
  }

  function onClick() {
    fetch('/events/clean', { method: 'PUT' })
      .then(response => response.json())
      .then(result => events.set(result));
  }
</script>

<div class="wrapper">
  <button class="button" on:click={onClick}>clean</button>
  {#each $events as event}
    <div style="margin-bottom: 10px">{JSON.stringify(event)}</div>
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
</style>
