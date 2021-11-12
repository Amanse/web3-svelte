<script>
  import ListFiles from "./components/ListFiles.svelte";
  import AddToken from "./components/AddToken.svelte";
  import UploadForm from './components/UploadForm.svelte'

  $: token = localStorage.getItem("WEB3_TOKEN")

</script>

<main>
  {#if token == null}
    <AddToken />
  {/if}
  {#if token != null}
    <UploadForm />
    <ListFiles />
  {/if}
</main>
