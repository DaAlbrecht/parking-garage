<script lang="ts">
	import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    export let data : PageData;
</script>

<div class="flex justify-center flex-col">
    <p class="text-center"> Garage: {data.garage?.name} </p>
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
        </div>
    {/each}
</div>