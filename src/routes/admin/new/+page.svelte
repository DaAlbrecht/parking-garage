<script lang="ts">
  import { enhance } from '$app/forms';
  import AdminChildLayout from '../../../lib/components/ChildLayout.svelte';

  let name: string;
  let address: string;
</script>

<AdminChildLayout>
  <div>
    <div class="text-center">
      <h1 class="mb-3 text-3xl">New Garage</h1>
      <form method="POST" action="?/createGarage" class="flex flex-col items-center gap-2">
        <input
          type="text"
          bind:value={name}
          name="name"
          placeholder="Name"
          class="input w-full max-w-xs"
        />
        <input
          type="text"
          bind:value={address}
          name="address"
          placeholder="Address"
          class="input w-full max-w-xs"
        />
        <button disabled={!name || !address} class="btn-success btn mt-4">add garage</button>
      </form>
    </div>
  </div>
</AdminChildLayout>
