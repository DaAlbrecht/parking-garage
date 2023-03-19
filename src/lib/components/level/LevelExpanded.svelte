<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { LevelInfo } from './+page.server';
  import ParkingSpace from './ParkingSpace.svelte';

  export let level: LevelInfo | undefined = undefined;
  let inner: HTMLElement | undefined = undefined;
  const dispatch = createEventDispatcher();

  function close(e: KeyboardEvent | MouseEvent) {
    if (e.target === inner) return;
    dispatch('close');
  }
</script>

<div class="modal" class:modal-open={level} on:click={(e) => close(e)} on:keydown={(e) => close(e)}>
  <div class="modal-box" bind:this={inner}>
    {#if level}
      <h3 class="text-lg font-bold">Level: {level.level.levelNumber}</h3>
      <div class="grid grid-cols-4 gap-1 py-4">
        {#each level.parking_spaces as parking_space, i}
          <ParkingSpace occupied={parking_space} label={i + 1} />
        {/each}
      </div>
      <div class="modal-action">
        <!-- 🔵 set false on click -->
        <button class="btn" on:click={() => dispatch('close')}>Close</button>
      </div>
    {/if}
  </div>
</div>
