<script lang="ts">
  import { enhance } from '$app/forms';
    import type { PageData } from './$types';
  
    export let id: string = "";
    export let data: PageData;
</script>

<div class="h-full relative">
    <div class="flex flex-col">
        <div class="text-center">
            <form method="POST" action="?/longTermCustomer" use:enhance>
                <input type="text" name="id" value={id} placeholder="customer id"/>
                <button>Check in</button>
            </form>
            <form method="POST" action="?/getParkingSpot" use:enhance>
                <input type="hidden" name="id" value={1}/>
                <button>get parking spot</button>
            </form>
        </div>
    </div>
  </div>





  