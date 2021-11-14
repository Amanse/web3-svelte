<script>
  import { Link, navigate } from "svelte-routing";
  import { PerFileStore, FileCidStore } from "../stores";
  import axios from "axios";
  import { onMount, onDestroy } from "svelte";
  import { is_promise } from "svelte/internal";

  let cid;

  let loading = true;

  async function retriveFiles(cid) {
    await axios
      .get(`https://dweb.link/api/v0/ls?arg=${cid}`)
      .then((res) => res.data)
      .then((data) => {
        PerFileStore.update(() => data["Objects"][0]["Links"]);
      });
    loading = false;
  }

  const handleFolder = (hash) => {
    PerFileStore.update(() => []);
    retriveFiles(hash);
  };

  onMount(() => {
    FileCidStore.subscribe((value) => {
      if (value == "") {
        navigate("/", { replace: true });
      }
      cid = value;
    });
    retriveFiles(cid);
  });
  onDestroy(() => {
    PerFileStore.update(() => []);
  });
</script>

<main>
  <div class="py-6 px-6 w-full flex flex-grow place-content-center container">
    <Link
      class="bg-white hover:bg-gray-100 w-full text-center text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow "
      to="/">Go to home</Link
    >
  </div>
  {#if loading}
    <div class="container mx-auto">loading...</div>
  {/if}
  {#if !loading}
    <div class="container mx-auto">
      {#each $PerFileStore as file (file.Hash)}
        <p>
          {#if file.Type == 2}
            <a href="https://{file.Hash}.ipfs.dweb.link/">{file.Name}</a>
          {/if}
          {#if file.Type == 1}
            <div class="is-flex ">
              <button
                class="bg-blue-500 rounded transition duration-200 text-white font-bold hover:bg-blue-700 py-2 px-4"
                on:click={handleFolder(file.Hash)}>{file.Name}</button
              >
              <a
                class="font-thin font-mono"
                href="https://{file.Hash}.ipfs.dweb.link/">(view on ipfs)</a
              >
            </div>
          {/if}
        </p>
      {/each}
    </div>
  {/if}
</main>
