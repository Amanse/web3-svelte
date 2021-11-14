<script>
  import { onMount } from "svelte";
  import { Web3Storage as web3s } from "web3.storage";
  import { FilesStore } from "../stores";
  import SingleFile from "./SingleFile.svelte";

  const token = localStorage.getItem("WEB3_TOKEN");
  let loading = true;

  async function listUploads() {
    const client = new web3s({ token: token });
    for await (const upload of client.list()) {
      FilesStore.update((curr) => {
        return [...curr, upload];
      });
    }
    loading = false;
  }

  onMount(() => {
    FilesStore.update(() => []);
    listUploads();
  });
</script>

<main>
  {#if loading}
    <p>loading...</p>
  {/if}
  {#each $FilesStore as file (file.cid)}
    <div class="container mx-auto grid grid-flow-col auto-cols-max">
      <SingleFile name={file.name} cid={file.cid} />
    </div>
  {/each}
</main>
