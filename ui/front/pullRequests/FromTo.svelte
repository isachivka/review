<script>
  export let pullRequest;
</script>

<div class="branch-from-to">
  <span class="from">{pullRequest.headRefName}</span>
  <span class="to">{pullRequest.baseRefName}</span>
  <span class="icon" />
  <span class="bg" />
</div>

<style>
  .bg {
    position: absolute;
    width: 20px;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    background: linear-gradient(270deg, #2C2C2C 0%, rgba(196, 196, 196, 0) 100%);
  }

  .branch-from-to {
    overflow: hidden;
    width: 300px;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 40px;
    font-size: 12px;
    position: relative;
  }

  .branch-from-to .to {
    position: absolute;
    top: 19px;
    left: calc(33px + 10px);
    z-index: 5;
  }
  .branch-from-to .from {
    position: absolute;
    top: 0;
    left: calc(15px + 10px);
    z-index: 5;
  }
  .branch-from-to .icon {
    position: absolute;
    top: 4px;
    left: calc(0 + 10px);
    width: 28px;
    height: 28px;
    background: linear-gradient(90deg, #b425c5, #b90e45);
    -webkit-mask: url('/images/branch.svg') no-repeat center;
    -webkit-mask-size: 28px 28px;
  }
</style>
