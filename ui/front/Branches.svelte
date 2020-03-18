<script>
  import { branches } from './store';

  fetch('/branches')
    .then(response => response.json())
    .then(result => branches.set(result));

  $: {
    console.log('Branches:', $branches);
  }
</script>

<h1>Branches 1</h1>
<p>{JSON.stringify($branches)}</p>
