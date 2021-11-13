<script>
  import getToken from '../helpers/web3helpers.js';
  import {Web3Storage} from 'web3.storage'
  import {FilesStore} from '../stores'

  let fileName = ""

  async function handleUpload() {
    const fileSelect = document.getElementById("fileToUpload")
    // @ts-ignore
    const selectedFile = fileSelect.files[0]
    const client = new Web3Storage({token:getToken()})


    const cid = await client.put([selectedFile], {
      name: selectedFile.name
    })

    const newUpload = {
      name: selectedFile.name,
      cid
    }

    FilesStore.update((curr) =>  [newUpload, ...curr])

  }

  const handleLogout = () => {
    localStorage.removeItem("WEB3_TOKEN")
    location.reload()
  }

  const handleFileName = (e) => {
    fileName = e.target.files[0].name
  }
</script>

<main class="level">
  <div class="level-left mr-4">
  <form id="uploadForm" on:submit|preventDefault={handleUpload}>
    <div class="file has-name">
      <label class="file-label">
        <input class="file-input" id="fileToUpload" type="file" name="resume" on:change={handleFileName}>
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label">
            Choose a file…
          </span> 
        </span>
        {#if fileName != ""}
        <span class="file-name">
          {fileName}
        </span>
        {/if}
      </label>
    </div>
  </form>
  <div class="level-item">
    <button class="button is-primary" on:click={handleUpload}>Upload</button>
  </div>
</div>
<div class="level-right">
  <div class="level-item">
    <button class="button is-danger is-light" on:click={handleLogout}>
      <span class="icon">
        <i class="fas fa-trash-alt"></i>
      </span>
    </button>
  </div>
</div>
</main>