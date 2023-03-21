<script lang="ts">
  import type { GarageInfo } from '../../../routes/accounting/year/+page.svelte';
  import { createEventDispatcher } from 'svelte';
  import { DateTime } from 'luxon';
  export let garageInfo: GarageInfo;

  const dispatch = createEventDispatcher();
</script>

<div
  class="card bg-base-100 shadow-xl"
  on:click={() => dispatch('expand')}
  on:keydown={() => dispatch('expand')}
>
  <div class="card-body px-4">
    <h2 class="card-title">Garage: {garageInfo?.name}</h2>
    <div class="stats stats-vertical shadow">
      <div class="stat">
        <div class="stat-title">Revenue</div>
        <div class="stat-value">{garageInfo?.totalRevenue}</div>
      </div>
    </div>
  </div>
</div>
