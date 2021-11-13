<script>
  import {Web3Storage} from 'web3.storage'
  import {FilesStore} from '../stores'

  let fileName = ""
  let token = localStorage.getItem("WEB3_TOKEN")

  async function handleUpload() {
    const fileSelect = document.getElementById("fileToUpload")
    // @ts-ignore
    const selectedFile = fileSelect.files[0]
    const client = new Web3Storage({token:token})


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
  <form id="uploadForm" on:submit|preventDefault={handleUpload}>
    
        <input class="file-input" id="fileToUpload" type="file" name="resume" on:change={handleFileName}>
        <button class="button is-link" on:click={handleUpload}>Upload</button>

  </form>
 

    <button class="button is-danger is-light" on:click={handleLogout}>
      X
    </button>

</main>