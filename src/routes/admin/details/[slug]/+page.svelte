<script lang="ts">
    import type { PageData } from './$types';
        export let data: PageData;
</script>

{#each data.parkingSpaceInfos as parkingSpaceInfo}

<div>
    {parkingSpaceInfo.level.levelNumber}
    <div>
        <p>Report</p>
        <p>Estimated Revenue: {parkingSpaceInfo.report.estimatedRevenue}</p>
        <p>Level occupancy: {parkingSpaceInfo.report.occupancy}</p>
        <p>Permanent Tenants:{parkingSpaceInfo.report.permanentTenants}</p>
    </div>
</div>
{#each parkingSpaceInfo.parking_spaces as parking_space}
{#if parking_space == true}
    <div class="bg-red-700">
        {parking_space}
    </div>
{:else}
    <div class="bg-green-700">
        {parking_space}
    </div>
{/if}
{/each}
    
{/each}