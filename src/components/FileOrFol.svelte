<script>
  import { Link, navigate } from "svelte-routing";
  import { PerFileStore, FileCidStore } from "../stores";
  import axios from "axios";
  import { onMount, onDestroy } from "svelte";

  let cid;
  let folderCid;

  let loading = true;
  let prevHash = "";

  function retriveFiles(cid) {
    axios
      .get(`https://dweb.link/api/v0/ls?arg=${cid}`)
      .then((res) => res.data)
      .then((data) => {
        PerFileStore.update(() => data["Objects"][0]["Links"]);
        loading = false;
      });
  }

  const handleFolder = (hash) => {
    folderCid = hash;
    loading = true;
    prevHash = cid;
    PerFileStore.update(() => []);
    retriveFiles(hash);
  };

  const handlePrev = () => {
    loading = true;
    PerFileStore.update(() => []);
    retriveFiles(prevHash);
    prevHash = "";
  };

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  onMount(() => {
    FileCidStore.subscribe((value) => {
      if (value == "") {
        navigate("/", { replace: true });
      }
      cid = value;
      folderCid = value;
    });
    retriveFiles(cid);
  });
  onDestroy(() => {
    PerFileStore.update(() => []);
  });
</script>

<main class="dark:text-white">
  <div class="py-6 px-6 w-full flex flex-grow place-content-center container">
    <Link
      class="bg-white hover:bg-gray-100 w-full text-center text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow "
      to="/">Go to home</Link
    >
    {#if prevHash != ""}
      <button
        class="bg-white hover:bg-gray-100 w-full text-center text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow "
        on:click={handlePrev}>Go Back</button
      >
    {/if}
  </div>
  {#if loading}
    <div class="container mx-auto">loading...</div>
  {/if}
  {#if !loading}
    <div class="container mx-auto">
      {#each $PerFileStore as file (file.Hash)}
        <p>
          {#if file.Type == 2}
            <a href="https://{folderCid}.ipfs.dweb.link/{encodeURI(file.Name)}"
              >{file.Name}</a
            >
            <span class="font-thin font-mono py-1"
              >({formatBytes(file.Size)})</span
            >
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
