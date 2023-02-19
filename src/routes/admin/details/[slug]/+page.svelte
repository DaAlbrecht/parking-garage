<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
</script>

{#each data.levels as level }
    {#each Array(level.parking_spaces) as _, index(index)}
        <div>{index}</div>
    {/each}
{/each}