<script>
  import { Link } from "svelte-routing";
  import { FileCidStore } from "../stores";

  export let name;
  export let cid;

  const setCidStore = () => {
    FileCidStore.update(() => cid);
  };

  const copyCid = () => {
    navigator.clipboard.writeText(cid);
  };
</script>

<main class="text-wrap flex">
  <Link to="cid/" on:click={setCidStore}>{name}</Link>
  <br />
  <button class="mx-1 text-sm" on:click={copyCid}
    ><i class="fas fa-copy" /></button
  >
</main>
