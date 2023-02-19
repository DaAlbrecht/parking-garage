<script lang="ts">
    import type { PageData } from './$types';
    import { enhance } from '$app/forms';
    export let data: PageData;
    let showCreateGarageForm = false;
</script>

<div class="flex flex-col">
    <div>
        <button on:click={() => showCreateGarageForm = !showCreateGarageForm}>New garage</button>
    </div>
    <div class="text-center">
        {#if showCreateGarageForm}
            <form method="POST" action="?/createGarage" use:enhance>
                <input type="text" name="name" placeholder="name"/>
                <input type="text" name="address" placeholder="address"/>
                <button>add garage</button>
            </form>
        {/if}
    </div>
    {#each data.garages as garage}
        <div class="flex justify-center content-center gap-5">
            <p>{garage.id}</p>
            <p>{garage.name}</p>
            <p>{garage.address}</p>
            <div class="flex justify-center content-center gap-5">
                <form method="POST" action="?/deleteGarage" use:enhance>
                    <input type="hidden" name="id" value={garage.id}/>
                    <button>delete</button>
                </form>
                <a href="/admin/edit/{garage.id}">edit</a>
                <a href="/admin/details/{garage.id}">details</a>
            </div>
        </div>
    {/each}
</div>