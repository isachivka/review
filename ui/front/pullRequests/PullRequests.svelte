<script>
  import last from 'lodash/last';
  import { pullRequests } from '../store';

  fetch('/prs')
    .then(response => response.json())
    .then(result => pullRequests.set(result));

  $: {
    console.log('PullRequests:', $pullRequests);
  }
</script>

{#if $pullRequests}
  <table class="table">
    {#each $pullRequests as pullRequest}
      <tr>
        <td class="fixWidth">
          <span class="from">{pullRequest.headRefName}</span>
          <span class="to">{pullRequest.baseRefName}</span>
          <span class="icon" />
        </td>
        <td><a href={pullRequest.permalink} target="_blank">#{last(pullRequest.permalink.split('/'))}</a></td>
        <td>
          <span class={pullRequest.reviews.nodes.length > 0 ? 'review approved': 'review'}>
            <span>x{pullRequest.reviews.nodes.length}</span>
          </span>
        </td>
      </tr>
    {/each}
  </table>
{/if}

<style>
  .review, .review > * {
    box-sizing: border-box;
  }
  .review {
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
  .review:before {
    content: 'Approved ';
  }


  .review.approved {
    background: #a90ea2;
    opacity: 1;
  }

  .review span {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 100%;
    height: 18px;
    width: 18px;
    text-align: center;
    display: inline-block;
  }

  .review.approved span {

  }


  .table {
    margin: 20px auto;
    max-width: 827px;
  }

  .fixWidth {
    width: 300px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    position: relative;
    height: 40px;
    font-size: 12px;
  }


  .fixWidth .to {
    position: absolute;
    top: 19px;
    left: 33px;
    z-index: 5;
  }
  .fixWidth .from {
    position: absolute;
    top: 0;
    left: 15px;
    z-index: 5;
  }
  .fixWidth .icon {
    position: absolute;
    top: 4px;
    left: 0;
    width: 28px;
    height: 28px;
    background: linear-gradient(90deg, #b425c5, #b90e45);
    -webkit-mask: url('/images/branch.svg') no-repeat center;
    -webkit-mask-size: 28px 28px;
  }
</style>
