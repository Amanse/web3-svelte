<script>
  import {Router,Route} from 'svelte-routing'
  import FileOrFol from './components/FileOrFol.svelte'
  import ListFiles from "./components/ListFiles.svelte";
  import AddToken from "./components/AddToken.svelte";
  import UploadForm from './components/UploadForm.svelte'

  $: token = localStorage.getItem("WEB3_TOKEN")

  export let url = ""

</script>

<Router url="{url}">
  <Route path="/">
  {#if token == null}
    <AddToken />
  {/if}
  {#if token != null}
    <UploadForm />
    <ListFiles />
  {/if}
</Route>
<Route path="/cid/:cid" let:params>
  <FileOrFol cid={params.cid} />
</Route>
</Router>
