<script lang="ts">
  import { enhance } from '$app/forms';
  import AdminChildLayout from '$lib/components/ChildLayout.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  let from: string | undefined = undefined;
  let to: string | undefined = undefined;
  let customerType: boolean | undefined = undefined;
  let selectedGarage: number | undefined = undefined;
</script>

<AdminChildLayout backLink="/accounting">
  <div class="">
    <div class="text-center">
      <h1 class="mb-3 text-3xl">New Report</h1>
      <form
        method="POST"
        use:enhance
        action="?/generateReport"
        class="flex flex-col items-center gap-2"
      >
        <input
          type="date"
          bind:value={from}
          name="from"
          placeholder="Name"
          class="input w-full max-w-xs"
        />
        <input
          type="date"
          bind:value={to}
          name="to"
          placeholder="Address"
          class="input w-full max-w-xs"
        />
        <select
          name="customerType"
          bind:value={customerType}
          class="select-bordered select w-full max-w-xs"
        >
          <option value={undefined} disabled selected>Select customer type</option>
          <option value="true">Permanent tenant</option>
          <option value="false">Occasional users</option>
        </select>
        <select
          name="id"
          bind:value={selectedGarage}
          class="select-bordered select w-full max-w-xs"
        >
          <option value={undefined} disabled selected>Select garage</option>
          {#each data.garages as garage}
            <option value={garage.id}>
              {garage.name}
            </option>
          {/each}
        </select>
        <button
          disabled={!from || !to || !customerType || !selectedGarage}
          class="btn-success btn mt-4">Generate Report</button
        >
      </form>
    </div>
  </div>
</AdminChildLayout>
