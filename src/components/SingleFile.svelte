<script>
  import {Link} from 'svelte-routing'

  export let name
  export let cid

  const linkToFile = `https://${cid}.ipfs.dweb.link`
</script>

<main>
  <Link to="cid/{cid}">{name}</Link>
</main>