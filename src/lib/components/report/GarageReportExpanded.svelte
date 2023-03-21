<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { GarageInfo } from '../../../routes/accounting/year/+page.svelte';

  export let garage: GarageInfo | undefined = undefined;
  let inner: HTMLElement | undefined = undefined;
  const dispatch = createEventDispatcher();

  function close(e: KeyboardEvent | MouseEvent) {
    if (e.target === inner) return;
    dispatch('close');
  }
</script>

<div
  class="modal"
  class:modal-open={garage}
  on:click={(e) => close(e)}
  on:keydown={(e) => close(e)}
>
  <div class="modal-box" bind:this={inner}>
    {#if garage}
      <h3 class="text-lg font-bold">Garage: {garage.name}</h3>
      <div class=" gap-1 py-4">
        <div class="w-full overflow-x-auto">
          <table class="garagetable mx-auto w-full max-w-5xl table-fixed">
            <thead>
              <tr>
                <th>Month</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {#each garage.monthlyRevenue as monthlyRevenue}
                <tr>
                  <td>{monthlyRevenue.month}</td>
                  <td>{monthlyRevenue.revenue}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-action">
        <!-- 🔵 set false on click -->
        <button class="btn" on:click={() => dispatch('close')}>Close</button>
      </div>
    {/if}
  </div>
</div>
