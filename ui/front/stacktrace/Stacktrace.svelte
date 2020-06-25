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
  textarea {
    flex-grow: 1;
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.3);
    resize: none;
    color: #c7c7c7;
    border-radius: 5px;
    padding: 10px;
    margin: 0 10px 0 0;
  }
  textarea.error {
    border: 1px solid rgba(255, 100, 100, 0.5);
  }
  textarea:focus {
    border: 1px solid rgba(255, 255, 255, 0.5);
    outline: none;
  }
  textarea.error:focus {
    border: 1px solid rgba(255, 100, 100, 0.8);
  }
  button {
    color: #fff;
    border-radius: 100px;
    font-size: 10px;
    padding: 2px 10px;
    height: 22px;
    line-height: 17px;
    display: inline-block;
    background: #186419;
    opacity: 1;
  }
</style>
