<script>
  import StackTraceGPS from 'stacktrace-gps';
  import { stacktrace } from '../store';

  let sourceStackTrace;
  let error;
  let parsedStackTrace;

  function handleClick() {
    try {
      error = false;
      parsedStackTrace = JSON.parse(sourceStackTrace.replace(/'/g, '"'));
      stacktrace.set([]);
      for (let i = 0; parsedStackTrace[i]; i++) {
        const line = parsedStackTrace[i]
        const gps = new StackTraceGPS();
        gps.pinpoint({
          columnNumber: line.columnNumber,
          lineNumber: line.lineNumber,
          fileName: line.fileName,
        }).then((res) => {
          stacktrace.update(arr => {
            arr[i] = res;
            return arr;
          });
        });
      }
    } catch (err) {
      error = true;
      console.error(err);
    }
  }

  $: {
    console.log($stacktrace);
  }
</script>

<div class="wrapper">
  <div class="form">
    <textarea class="{error ? 'error' : ''}" bind:value={sourceStackTrace} />
    <button on:click={handleClick}>Decrypt</button>
  </div>
  <div class="stacktrace">
    {#each $stacktrace as line}
      {line}<br />
    {/each}
  </div>
</div>

<style>
  .stacktrace {
  }
  .wrapper {
    max-width: 827px;
    position: relative;
    margin: 20px auto;
  }
  .form {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
</style>
