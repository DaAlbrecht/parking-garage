<script lang="ts">
  import { RateType, type ParkingRate } from '@prisma/client';
  import { createEventDispatcher } from 'svelte';
  import Rates from './Rates.svelte';

  export let rates: ParkingRate[];
  export let show: boolean = false;

  let activeTab: RateType = RateType.WEEKDAY;

  const dispatch = createEventDispatcher();

  function setTab(tab: RateType) {
    activeTab = tab;
  }
</script>

<div class="modal" class:modal-open={show}>
  <div class="modal-box max-w-xl">
    <h3 class="text-lg font-bold">Edit prices</h3>
    <div class="tabs w-full py-1 px-2">
      {#each Object.values(RateType) as tab}
        <button
          class:tab-active={activeTab === tab}
          on:click={() => setTab(tab)}
          class="tab-bordered tab">{tab}</button
        >
      {/each}
    </div>
    <div>
      <Rates {rates} type={activeTab} />
    </div>
    <div class="modal-action">
      <!-- 🔵 set false on click -->
      <button class="btn" on:click={() => dispatch('close')}>Close</button>
    </div>
  </div>
</div>
