<script lang="ts">
  import type { ParkingRate, RateType } from '@prisma/client';
  import { DateTime } from 'luxon';

  export let rates: ParkingRate[];
  export let type: RateType;

  $: activeRates = rates.filter((rate) => rate.rateType === type);
</script>

{#each activeRates as rate}
  <div>{DateTime.fromJSDate(rate.start_time).weekdayLong}:</div>
{/each}
