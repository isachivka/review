<script>
  import { Router, link, links, Route } from "svelte-routing";
  import PullRequests from "./pullRequests/PullRequests.svelte";
  import MergedPullRequests from "./mergedPullRequests/MergedPullRequests.svelte";
  import Branches from "./branches/Branches.svelte";
  import Events from "./events/Events.svelte";
  import Stacktrace from "./stacktrace/Stacktrace.svelte";

  export let url = "";
</script>

<Router url="{url}">
  <header>
    <nav use:links class="mainMenu">
      <a use:link href="/">Pull Requests</a>
      <a use:link href="/merged/timeline">Merged</a>
      <a use:link href="/branch">Branches</a>
      <a use:link href="/stacktrace">Stacktrace</a>
      <div class="grow"></div>
      <a class="right passive" use:link href="/ev">Events</a>
    </nav>
  </header>
  <div>
    <Route path="/" component="{PullRequests}" />
    <Route path="/merged/*" component="{MergedPullRequests}" />
    <Route path="/branch" component="{Branches}" />
    <Route path="/ev" component="{Events}" />
    <Route path="/stacktrace" component="{Stacktrace}" />
  </div>
</Router>

<style>
  header {
    background: rgba(0, 0, 0, 0.4);
    margin: 0 -20px 10px;
    padding: 15px 20px 17px;
  }
  .mainMenu {
    max-width: 827px;
    position: relative;
    margin: 0 auto;
    display: flex;
  }
  .mainMenu .grow {
    flex-grow: 1;
  }
  .mainMenu a {
    margin: 0 15px 0 0;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }
  .mainMenu a:hover {
    opacity: 0.8;
  }
  .mainMenu a.passive {
    opacity: 0.3;
  }
</style>
