<script>
  import {Router,Route} from 'svelte-routing'
  import FileOrFol from './components/FileOrFol.svelte'
  import ListFiles from "./components/ListFiles.svelte";
  import AddToken from "./components/AddToken.svelte";
  import UploadForm from './components/UploadForm.svelte'

  $: token = localStorage.getItem("WEB3_TOKEN")

  export let url = ""

</script>

<main>
<Router url="{url}">
  <Route path="/">
  {#if token == null}
    <AddToken />
  {/if}
  {#if token != null}
  <div class="hero is-primary is-flex is-justify-content-space-around is-align-content-space-between">
    <div class="hero-body">
    <UploadForm />
  </div>
  </div>
  <div class="container">
    <ListFiles />
  </div>
  {/if}
</Route>
<Route path="cid">
  <FileOrFol />
</Route>
</Router>
</main>

<style>
  main{
    height: 100vh;
    background-attachment: fixed;
    background-color: whitesmoke;
  }
</style>