<script lang="ts" context="module">
  export type LevelInfo = PageData['levelInfo'][number];
</script>

<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  import AdminChildLayout from '$lib/components/ChildLayout.svelte';
  import Level from '$lib/components/level/Level.svelte';
  import LevelExpanded from '$lib/components/level/LevelExpanded.svelte';
  let expandedLevel: LevelInfo | undefined = undefined;
  import { page } from '$app/stores';
</script>

<AdminChildLayout>
  <div class="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
    {#each data.levelInfo as levelInfo}
      <Level {levelInfo} on:expand={() => (expandedLevel = levelInfo)} />
    {:else}
      <div class="">
        <p class="text-xl mb-2">This garage has no level info</p>
        <a class="btn btn-primary" href={`/admin/edit/${$page.params.slug}`}>Edit</a>
      </div>
    {/each}
  </div>
  <LevelExpanded level={expandedLevel} on:close={() => (expandedLevel = undefined)} />
</AdminChildLayout>
