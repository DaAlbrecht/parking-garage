<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ParkingGarage } from '@prisma/client';

  export let garages: ParkingGarage[];
  let registerPlate: string | undefined = undefined;
  let id: string;
  let selectedGarage: number | undefined = undefined;

  $: canGetSpot = selectedGarage !== undefined && registerPlate;
  $: canLongTerm = selectedGarage !== undefined && id;
</script>

<div class="card w-1/2 bg-base-100 shadow-2xl">
  <div class="card-body">
    <div class="flex w-full justify-center">
      <div class="flex w-full flex-col gap-4 px-12">
        <select name="garageId" bind:value={selectedGarage} class="select-bordered select w-full">
          <option value={undefined} disabled selected>Select garage</option>
          {#each garages as garage}
            <option value={garage.id}>
              {garage.name}
            </option>
          {/each}
        </select>
        <div class="divider" />
        <form method="POST" action="?/getParkingSpot" use:enhance>
          <input type="hidden" name="garage" value={selectedGarage} />
          <label class="label" for="id">
            <span class="label-text">Register Plate</span>
          </label>
          <input
            type="number"
            name="id"
            bind:value={registerPlate}
            placeholder="Register Plate"
            class="input-bordered input w-full"
          />
          <div class="form-control mt-6">
            <button disabled={!canGetSpot} class="btn-primary btn">Get parking spot</button>
          </div>
        </form>
        <div class="divider">OR</div>
        <form method="POST" action="?/longTermCustomer" use:enhance>
          <input type="hidden" name="garage" value={selectedGarage} />
          <label class="label" for="id">
            <span class="label-text">Customer ID</span>
          </label>
          <input
            type="number"
            name="id"
            bind:value={id}
            placeholder="Customer ID"
            class="input-bordered input w-full"
          />
          <div class="form-control mt-6">
            <button disabled={!canLongTerm} class="btn-info btn">Check in</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
