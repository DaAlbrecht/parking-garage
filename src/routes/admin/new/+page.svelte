<script lang="ts">
  import { enhance } from '$app/forms';
  import AdminChildLayout from '../AdminChildLayout.svelte';
</script>

<AdminChildLayout>
  <div>
    <div class="text-center">
      <form
        method="POST"
        action="/admin?/createGarage"
        use:enhance
        class="flex flex-col items-center gap-2"
      >
        <input type="text" name="name" placeholder="Name" class="input w-full max-w-xs" />
        <input type="text" name="address" placeholder="Address" class="input w-full max-w-xs" />
        <button class="btn btn-success mt-4">add garage</button>
      </form>
    </div>
  </div>
</AdminChildLayout>
