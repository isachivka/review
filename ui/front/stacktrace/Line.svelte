<script>
  export let line;
</script>

{#if line !== undefined}
  <li>{line.fileName}:{line.lineNumber}:{line.columnNumber}</li>
{:else}
  <li>Loading...</li>
{/if}

<style>
  li {
    margin-bottom: 5px;
  }
</style>
