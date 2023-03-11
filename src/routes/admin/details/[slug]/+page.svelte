<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  import AdminChildLayout from '../../AdminChildLayout.svelte';
  import Level from './Level.svelte';
  import LevelExpanded from './LevelExpanded.svelte';
  import type { LevelInfo } from './+page.server';
  let expandedLevel: LevelInfo | undefined = undefined;
</script>

<AdminChildLayout>
  <div class="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
    {#each data.levelInfo as levelInfo}
      <Level {levelInfo} on:expand={() => (expandedLevel = levelInfo)} />
    {/each}
  </div>
  <LevelExpanded level={expandedLevel} on:close={() => (expandedLevel = undefined)} />
</AdminChildLayout>
