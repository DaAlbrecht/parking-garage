<script lang="ts">
    import type { PageData } from './$types';
    export let data : PageData;
</script>

<div class="flex justify-center flex-col">
    <p class="text-center"> Garage: {data.garage?.name} </p>
    {#each data.levels as level }
        <div class="justify-center text-center">
            <p> Level: {level.levelNumber}</p>
            <p> Parking spaces: {level.parking_spaces}</p>
        </div>
    {/each}
</div>