<script>
  import {Link, navigate} from "svelte-routing"
  import {PerFileStore, FileCidStore} from '../stores'
  import axios from "axios"
  import {onMount, onDestroy} from 'svelte'
import { is_promise } from "svelte/internal";

  let cid;

  
  let loading = true

  async function retriveFiles(cid) {
    await axios.get(`https://dweb.link/api/v0/ls?arg=${cid}`)
      .then((res) => res.data)
      .then((data) => {
        PerFileStore.update(() => data["Objects"][0]["Links"])
      })
    loading = false
  }

  const handleFolder = (hash) => {
    PerFileStore.update(() => [])
    retriveFiles(hash)
  }

  onMount(() => {
    FileCidStore.subscribe(value => {
      if(value==""){
        navigate("/", {replace:true})
      }
    cid = value
    })
    retriveFiles(cid)
  })
  onDestroy(() => {
    PerFileStore.update(() => [])
  })
</script>

<main>
  <Link class="button is-info is-light box" to="/">Go to home</Link>
  {#if loading}
  <div class="container">
    loading...
  </div>
  {/if}
  {#if !loading}
  <div class="container">
    {#each $PerFileStore as file (file.Hash)}
      <p>
        {#if file.Type == 2}
        <a href="https://{file.Hash}.ipfs.dweb.link/">{file.Name}</a>
        {/if}
        {#if file.Type==1}
        <div class="is-flex ">
          <button class="button is-info" on:click={handleFolder(file.Hash)}>{file.Name}</button>
          <a href="https://{file.Hash}.ipfs.dweb.link/" class="mt-2">(view on ipfs)</a>
        </div>
        {/if}
      </p>
    {/each}
  </div>
  {/if}
</main>