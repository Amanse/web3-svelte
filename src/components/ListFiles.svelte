<script>
  import { onMount } from "svelte";
  import { Web3Storage as web3s } from "web3.storage";
  import { FilesStore } from "../stores";
  import SingleFile from "./SingleFile.svelte";

  const token = localStorage.getItem("WEB3_TOKEN");
  let loading = true;
  let pins = [];

  async function listUploads() {
    const client = new web3s({ token: token });
    for await (const upload of client.list()) {
      FilesStore.update((curr) => {
        return [...curr, upload];
      });
    }
    loading = false;
  }

  function getPins() {
    if (localStorage.getItem("Pins") != null) {
      pins = JSON.parse(localStorage.getItem("Pins"));
    } else {
      const defaultPin = [
        {
          name: "Lover Taylor",
          cid: "bafybeihei3keuolzup6voozyzh34vbkfulmru5jilcwxcha2vgnwhivyna",
          token,
        },
      ];
      localStorage.setItem("Pins", JSON.stringify(defaultPin));
    }
  }

  function makePin(file) {
    file["token"] = token;
    pins = [file, ...pins];
    let pinsStr = JSON.stringify(pins);
    localStorage.setItem("Pins", pinsStr);
  }

  function unpin(file) {
    pins = pins.filter((pin) => pin.cid != file.cid && file.token == pin.token);
    localStorage.setItem("Pins", JSON.stringify(pins));
  }

  onMount(() => {
    FilesStore.update(() => []);
    getPins();
    listUploads();
  });
</script>

<main class="dark:text-white divide-y divide-green-300 py-2  divide-opacity-25">
  {#each pins as pin (pin.cid)}
    {#if pin.token == token}
      <div
        class="container  w-screen overflow-hidden overflow-ellipsis flex-wrap flex font-bold mx-auto"
      >
        <SingleFile name={pin.name} cid={pin.cid} />
        <button class="mx-1 text-sm text-red-400" on:click={unpin(pin)}>
          <i class="fas fa-trash" />
        </button>
      </div>
    {/if}
  {/each}
  <hr />
  {#if loading}
    <div class="container mx-auto">
      <p>loading...</p>
    </div>
  {/if}
  {#each $FilesStore as file (file.cid)}
    <div
      class="container mx-auto w-screen overflow-hidden overflow-ellipsis flex-wrap flex"
    >
      <SingleFile name={file.name} cid={file.cid} />
      <button class="text-sm text-green-400 mx-1" on:click={makePin(file)}>
        <i class="fas fa-solid fa-thumbtack" />
      </button>
    </div>
  {/each}
</main>
