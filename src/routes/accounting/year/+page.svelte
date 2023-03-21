<script lang="ts" context="module">
  export type GarageInfo = PageData['garageInfo'][number];
</script>

<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  import AdminChildLayout from '$lib/components/ChildLayout.svelte';
  import GarageReport from '$lib/components/report/GarageReport.svelte';
  import GarageReportExpanded from '$lib/components/report/GarageReportExpanded.svelte';
  let expandedGarage: GarageInfo | undefined = undefined;
</script>

<AdminChildLayout backLink="/accounting">
  <div class="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
    {#each data.garageInfo as garageInfo}
      <GarageReport {garageInfo} on:expand={() => (expandedGarage = garageInfo)} />
    {/each}
  </div>
  <GarageReportExpanded garage={expandedGarage} on:close={() => (expandedGarage = undefined)} />
</AdminChildLayout>
