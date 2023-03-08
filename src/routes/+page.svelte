<script lang="ts">
  import { enhance } from '$app/forms';
    import type { PageData } from './$types';
  
    export let id: string = "";
    export let data: PageData;

	let selected: number;
</script>

<div class="h-full relative">
    <div class="flex flex-col">
        <div class="text-center">
            <select bind:value={selected}>
                {#each data.garages as garage}
                    <option value={garage.id}>
                        {garage.name}
                    </option>
                {/each}
            </select>
            <form method="POST" action="?/longTermCustomer" use:enhance>
                <input type="text" name="id" value={id} placeholder="customer id"/>
                <input type="hidden" name="garage" value={selected}/>
                <button>Check in</button>
            </form>
            <form method="POST" action="?/getParkingSpot" use:enhance>
                <input type="hidden" name="id" value={selected}/>
                <button>get parking spot</button>
            </form>
        </div>
    </div>
  </div>





  