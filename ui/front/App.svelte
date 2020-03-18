<!-- App.svelte -->
<script>
  import { Router, Link, Route } from "svelte-routing";
  import PullRequests from "./PullRequests.svelte";
  import Branches from "./Branches.svelte";

  export let url = "";
</script>

<Router url="{url}">
  <nav>
    <Link to="/">PullRequests</Link>
    <Link to="/branch">Branches</Link>
  </nav>
  <div>
    <Route path="/" component="{PullRequests}" />
    <Route path="/branch" component="{Branches}" />
  </div>
</Router>
