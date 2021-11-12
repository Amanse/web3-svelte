<script>
  import getToken from '../helpers/web3helpers.js';
  import {Web3Storage} from 'web3.storage'
  import {FilesStore} from '../stores'


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
    document.getElementById("cid").innerHTML = `<p>${cid}</p>`

  }
</script>

<main>
  <form id="uploadForm" on:submit|preventDefault={handleUpload}>
    <div class="file">
      <label class="file-label">
        <input class="file-input" id="fileToUpload" type="file" name="resume">
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label">
            Choose a file…
          </span>
        </span>
      </label>
    </div>
    <button class="button is-primary" type="submit" id="uploadButton">Upload </button>
  </form>
  <div id="cid">
  </div>
</main>