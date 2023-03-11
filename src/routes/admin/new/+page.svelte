<script lang="ts">
  import { enhance } from '$app/forms';
  import AdminLayout from '../AdminLayout.svelte';
</script>

<AdminLayout>
  <div slot="navbar">
    <a class="btn gap-2" href="/admin">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
        />
      </svg>
      Back
    </a>
  </div>
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
</AdminLayout>
