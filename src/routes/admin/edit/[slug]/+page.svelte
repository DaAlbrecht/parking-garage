<script lang="ts">
	import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    export let data : PageData;
</script>

<div class="flex justify-center flex-col text-center">
    <p> Garage: {data.garage?.name} </p>
    <form method="POST" action="?/addLevel" use:enhance>
        <input type="hidden" name="garageId" value={data.garage?.id}/>
        <input type="number" name="parking_spaces" placeholder="Parking spaces"/>
        <button>add</button>
    </form>
    {#each data.levels as level }
        <div class="justify-center text-center flex gap-5">
            <p> Level: {level.levelNumber}</p>
            <p> Parking spaces: {level.parking_spaces}</p>
            <button>
                Edit
            </button>
            <form method="POST" action="?/deleteLevel" use:enhance>
                <input type="hidden" name="id" value={level.id}/>
                <button>delete</button>
            </form>
            <a href="/admin/details/{level.id}">Details</a>
        </div>
    {/each}
</div>