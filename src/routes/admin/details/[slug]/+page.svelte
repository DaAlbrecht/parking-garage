<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
</script>

{#each data.levels as level }
    <h1>level: {level.levelNumber}</h1>
    {#each Array(level.parking_spaces) as _, index(index)}
        {#if data.occupiedParkingSpaces.includes(index)}
            <div class="bg-red-600">{index}</div>
        {:else}
            <div>{index}</div>
        {/if}
    {/each}
{/each}