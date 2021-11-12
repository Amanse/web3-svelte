<script>
  import FileOrFol from './FileOrFol.svelte'
  export let name
  export let cid

  const linkToFile = `https://${cid}.ipfs.dweb.link`
</script>

<main>
  <a href={linkToFile}>{name}</a>
</main>