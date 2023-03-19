<script lang="ts">
  import type { PageData } from './$types';
  import AdminChildLayout from '$lib/components/ChildLayout.svelte';

  export let data: PageData;
</script>

<AdminChildLayout backLink="/accounting">
  <div>
    {data.report.generationTime}
    {data.report.id}
  </div>
</AdminChildLayout>
