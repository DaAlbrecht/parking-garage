<script>
  import { page } from '$app/stores';
  const error = $page.error;
</script>

{#if error}
  <h1>{error.message}</h1>
{/if}
