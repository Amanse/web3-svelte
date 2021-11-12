<script>

  let token = ''

  const handleSubmit = () => {
    localStorage.setItem("WEB3_TOKEN", token)
    location.reload()
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input type="text" bind:value={token} placeholder="Insert token here!" />
  <button type="submit"> Add Token </button>
</form>