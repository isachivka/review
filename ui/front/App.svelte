<script>
  import { Router, Link, Route } from "svelte-routing";
  import PullRequests from "./pullRequests/PullRequests.svelte";
  import Branches from "./branches/Branches.svelte";
  import Events from "./events/Events.svelte";

  export let url = "";
</script>

<Router url="{url}">
  <nav>
    <Link to="/">PullRequests</Link>
    <Link to="/branch">Branches</Link>
    <Link to="/ev">Events</Link>
  </nav>
  <div>
    <Route path="/" component="{PullRequests}" />
    <Route path="/branch" component="{Branches}" />
    <Route path="/ev" component="{Events}" />
  </div>
</Router>
