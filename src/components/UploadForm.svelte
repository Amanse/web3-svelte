<script>
  import { Web3Storage } from "web3.storage";
  import { FilesStore } from "../stores";

  let token = localStorage.getItem("WEB3_TOKEN");

  async function handleUpload() {
    const fileSelect = document.getElementById("fileToUpload");
    // @ts-ignore
    const selectedFile = fileSelect.files[0];
    const client = new Web3Storage({ token: token });

    const cid = await client.put([selectedFile], {
      name: selectedFile.name,
    });

    const newUpload = {
      name: selectedFile.name,
      cid,
    };

    FilesStore.update((curr) => [newUpload, ...curr]);
  }

  const handleLogout = () => {
    localStorage.removeItem("WEB3_TOKEN");
    localStorage.removeItem("Pins");
    location.reload();
  };
</script>

<main class="flex dark:bg-gray-900 dark:text-white bg-yellow-300">
  <form
    id="uploadForm"
    class="flex-grow w-1/2 flex  place-content-center items-center "
    on:submit|preventDefault={handleUpload}
  >
    <!-- <input class="file-input" id="fileToUpload" type="file" name="resume">
    <button class="button is-link" type="submit" on:click={handleUpload}>Upload</button> -->

    <label
      class="
      w-64
      flex flex-col
      items-center
      md:px-4
      md:py-4
      py-2
      px-2
      mt-2
      mb-2
      bg-white
      rounded-md
      shadow-md
      tracking-wide
      uppercase
      border border-blue
      cursor-pointer
      hover:bg-purple-600 hover:text-white
      text-purple-600
      ease-linear
      transition-all
      duration-150
    "
    >
      <i class="fas fa-cloud-upload-alt fa-3x" />
      <span class="mt-2 text-base leading-normal">Select a file</span>
      <input type="file" id="fileToUpload" class="hidden" />
    </label>
    <button
      class="
    bg-purple-500
    text-white
    ml-10
    hover:bg-purple-700
    active:bg-purple-900
    font-bold
    uppercase
    text-sm
    px-6
    py-3
    rounded-full
    shadow
    hover:shadow-lg
    outline-none
    focus:outline-none
    mr-1
    mb-1
    ease-linear
    transition-all
    duration-150
  "
      type="submit"
    >
      Upload
    </button>
  </form>
  <div class="flex-1">
    <button
      class="
    bg-red-500 hover:bg-red-700 text-white font-bold rounded py-6 px-6 mt-4
    "
      on:click={handleLogout}
    >
      <i class="fa fa-trash-alt" />
    </button>
  </div>
</main>
