<script lang="ts" context="module">
  const tabs = ['weekdays', 'weekends', 'holidays', 'flatrate'] as const;
  export type RateTypes = (typeof tabs)[number];
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Rates from './Rates.svelte';

  export let show: boolean = false;

  let activeTab: RateTypes = 'weekdays';

  const dispatch = createEventDispatcher();

  function setTab(tab: RateTypes) {
    activeTab = tab;
  }
</script>

<div class="modal" class:modal-open={show}>
  <div class="modal-box">
    <h3 class="text-lg font-bold">Edit prices</h3>
    <div class="tabs w-full py-1 px-2">
      {#each tabs as tab}
        <button
          class:tab-active={activeTab === tab}
          on:click={() => setTab(tab)}
          class="tab-bordered tab">{tab}</button
        >
      {/each}
    </div>
    <div>
      <Rates type={activeTab} />
    </div>
    <div class="modal-action">
      <!-- 🔵 set false on click -->
      <button class="btn" on:click={() => dispatch('close')}>Close</button>
    </div>
  </div>
</div>
