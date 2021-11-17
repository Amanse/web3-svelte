<script>
  let token = "";

  const handleSubmit = () => {
    localStorage.setItem("WEB3_TOKEN", token);
    location.reload();
  };
</script>

<form on:submit|preventDefault={handleSubmit} class="container mx-auto py-4">
  <!-- <input type="text" bind:value={token} placeholder="Insert token here!" /> -->
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="token">
      Token
    </label>
    <input
      bind:value={token}
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="token"
      type="text"
      placeholder="Enter token here..."
    />
  </div>
  <button
    type="submit"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Add Token
  </button>
</form>
