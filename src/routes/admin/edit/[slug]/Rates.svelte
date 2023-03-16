<script lang="ts">
  import type { ParkingRate, RateType } from '@prisma/client';
  import { DateTime, Settings } from 'luxon';
  import { createEventDispatcher } from 'svelte';
  Settings.defaultZone = 'utc';

  const dispatch = createEventDispatcher();

  export let rates: ParkingRate[];
  export let type: RateType;

  $: activeRates = rates.filter((rate) => rate.rateType === type);
</script>

<div class="p-4">
  {#each activeRates as rate}
    <div class="mb-2">
      <div class="form-control w-full max-w-xs">
        {#if rate.rateType !== 'DAYRATE' && rate.rateType !== 'MONTHRATE'}
          <label class="label" for={`${rate.id}`}>
            <span class="font-xl label-text font-mono"
              >{DateTime.fromJSDate(rate.start_time).toFormat('HH:mm')} - {DateTime.fromJSDate(
                rate.end_time
              ).toFormat('HH:mm')}</span
            >
          </label>
        {/if}
        <input
          name={rate.id.toString()}
          id={rate.id.toString()}
          type="tel"
          value={rate.price}
          class="input-bordered input w-full max-w-xs"
        />
      </div>
    </div>
  {/each}
</div>
