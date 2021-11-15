<script>
  import { Link } from "svelte-routing";
  import { FileCidStore } from "../stores";

  export let name;
  export let cid;

  const setCidStore = () => {
    FileCidStore.update(() => cid);
  };
</script>

<main class="text-wrap">
  <Link to="cid/" on:click={setCidStore}>{name}</Link>
</main>
