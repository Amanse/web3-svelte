<script>
  import {Link} from "svelte-routing"
  import {PerFileStore} from '../stores'
  import axios from "axios"
  import {onMount, onDestroy} from 'svelte'
  export let cid

  let loading = true

  async function retriveFiles(cid) {
    await axios.get(`https://dweb.link/api/v0/ls?arg=${cid}`)
      .then((res) => res.data)
      .then((data) => {
        PerFileStore.update(() => data["Objects"][0]["Links"])
      })
    loading = false
  }

  onMount(() => {
    retriveFiles(cid)
  })
  onDestroy(() => {
    PerFileStore.update(() => [])
  })
</script>

<main>
  <Link to="/">Go to home</Link>
  {#if loading}
    loading...
  {/if}
  {#if !loading}
    {#each $PerFileStore as file (file.Hash)}
      <p>
        {#if file.Type == 2}
        <a href="https://{file.Hash}.ipfs.dweb.link/">{file.Name}</a>
        {/if}
        {#if file.Type==1}
        <a href="/cid/{file.Hash}">{file.Name}</a>
        {/if}
      </p>
    {/each}
  {/if}
</main>