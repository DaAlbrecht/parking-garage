<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  export let id: string = '';
  export let data: PageData;

  let selected: number;
</script>

<div class="relative h-full">
  <p>Select a garage</p>
  <p>Prompt for anonymous login with register plate or permanent tenant id</p>
  <p>Check if user is already checked if, if yes, go to checkout</p>
  <p>Park. You get assigned a spot. On this page prices can be shown</p>

  <div class="flex flex-col">
    <div class="text-center">
      <select bind:value={selected}>
        {#each data.garages as garage}
          <option value={garage.id}>
            {garage.name}
          </option>
        {/each}
      </select>
      <form method="POST" action="?/longTermCustomer" use:enhance>
        <input type="text" name="id" value={id} placeholder="customer id" />
        <input type="hidden" name="garage" value={selected} />
        <button>Check in</button>
      </form>
      <form method="POST" action="?/getParkingSpot" use:enhance>
        <input type="hidden" name="id" value={selected} />
        <button>get parking spot</button>
      </form>
      <form method="POST" action="?/exitGarage" use:enhance>
        <input type="hidden" name="id" value={selected} />
        <input type="text" name="customerId" value={id} placeholder="customer id" />
        <button>exit</button>
      </form>
    </div>
  </div>
</div>
