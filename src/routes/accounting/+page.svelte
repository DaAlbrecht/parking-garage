<script lang="ts">
  import type { PageData } from './$types';
  import AdminLayout from '$lib/components/AdminLayout.svelte';

  export let data: PageData;
</script>

<AdminLayout>
  <div slot="navbar">
    <a href="/accounting/new" class="btn gap-2">
      New Report
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
          <thead>
            <tr>
              <th>Generation Time</th>
              <th>Garage name</th>
              <th class="text-end">Details</th>
            </tr>
          </thead>
          <tbody>
            {#each data.reports as report}
              <tr>
                <td>{report.generationTime.toLocaleDateString('de-CH')}</td>
                <td>{report.parkingGarage.name}</td>
                <td class="text-end">
                  <div class="flex justify-end gap-2">
                    <a class="btn-primary btn-square btn" href="/accounting/report/{report.id}">
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
                  </div>
                </td>
              </tr>
            {:else}
              <tr>
                <td colspan="3">No reports yet</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
    <!-- ADD: yearly report button, should split view on a monthly basis, prob implement /accounting/yearlyReport in the backend that returns a list of monthly reports -->
  </div>
</AdminLayout>
