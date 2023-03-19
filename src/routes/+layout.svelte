<script>
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import { page } from '$app/stores';
</script>

<div class={`flex h-full flex-col`}>
  <Header route={$page.route.id} />
  <div class="container mx-auto px-4 pt-8">
    <slot />
  </div>
</div>
