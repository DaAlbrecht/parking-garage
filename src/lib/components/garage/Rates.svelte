<script lang="ts">
  import type { ParkingRate, RateType } from '@prisma/client';
  import { DateTime, Settings } from 'luxon';
  Settings.defaultZone = 'utc';

  export let rates: ParkingRate[];
  export let type: RateType;
</script>

{#each rates as rate}
  <div class="mb-2" class:hidden={rate.rateType !== type}>
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
