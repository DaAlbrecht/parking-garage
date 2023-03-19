<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  import AdminLayout from '$lib/components/AdminLayout.svelte';
</script>

<AdminLayout>
  <div slot="navbar">
    <a href="/admin/new" class="btn gap-2">
      New
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </a>
  </div>
  <div>
    <div class="flex content-center justify-center gap-5">
      <div class="w-full overflow-x-auto">
        <table class="garagetable mx-auto w-full max-w-5xl table-fixed">
          <tbody>
            <!-- row 1 -->
            {#each data.garages as garage}
              <tr>
                <td>{garage.name}</td>
                <td>{garage.address}</td>
                <td class="text-end">
                  <div class="flex justify-end gap-2">
                    <a class="btn-primary btn-square btn" href="/admin/details/{garage.id}">
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
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </a>
                    <a class="btn-primary btn-square btn" href="/admin/edit/{garage.id}">
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </a>
                  </div>
                </td>
              </tr>
            {:else}
              <tr>
                <td colspan="3">No garages found</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</AdminLayout>
