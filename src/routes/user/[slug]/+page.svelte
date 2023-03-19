<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  import { onDestroy } from 'svelte';
  import { invalidateAll } from '$app/navigation';
  import { enhance } from '$app/forms';

  const interval = setInterval(invalidateAll, 1000 * 60 * 60);

  onDestroy(() => {
    clearInterval(interval);
  });

  let hoursParked = 0;
  let entry = '';
  $: if (data.customer) {
    hoursParked =
      (new Date().getTime() - new Date(data.customer.parkingTickets[0].entry_date).getTime()) /
      1000 /
      60 /
      60;
    entry = new Date(data.customer.parkingTickets[0].entry_date).toLocaleTimeString('de-CH', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

{#if data.customer}
  <div class="hero bg-base-200">
    <div class="hero-content text-center">
      <div class="flex flex-col gap-3">
        <h1 class="text-5xl font-bold">Welcome!</h1>
        <div class="stats shadow">
          <div class="stat">
            <div class="stat-title">Garage</div>
            <div class="stat-value">{data.customer.parkingGarage.name}</div>
          </div>
          {#if data.customer.is_long_term_customer}
            <div class="stat">
              <div class="stat-title">Long term customer</div>
              <div class="stat-value">YES</div>
            </div>
          {/if}
          {#if data.customer.parkingSpace}
            <div class="stat">
              <div class="stat-title">Parking Spot</div>
              <div class="stat-value">{data.customer.parkingSpace.parkingSpot + 1}</div>
            </div>
          {/if}
        </div>
        {#if data.price}
          <div class="stats shadow">
            <div class="stat place-items-center">
              <div class="stat-title">Entry</div>
              <div class="stat-value">{entry}</div>
            </div>
            <div class="stat place-items-center">
              <div class="stat-title">Hours parked</div>
              <div class="stat-value">{hoursParked.toFixed(1)}</div>
            </div>
            <div class="stat place-items-center">
              <div class="stat-title">Price</div>
              <div class="stat-value text-secondary">{data.price} CHF</div>
            </div>
          </div>
        {/if}
        <form method="POST" action="/?/exitGarage" use:enhance>
          <input type="hidden" name="customer_id" value={data.customer.id} />
          <button class="btn-primary btn">Checkout</button>
        </form>
      </div>
    </div>
  </div>
{/if}

{#if !data.customer}
  <div>No customer found!</div>
{/if}
