<script lang="ts">
  import type { RateTypes } from './EditPrices.svelte';

  const WEEKDAYS = [
    { id: 1, start: '00:00', end: '05:59' },
    { id: 2, start: '06:00', end: '08:59' },
    { id: 3, start: '09:00', end: '17:59' },
    { id: 4, start: '18:00', end: '20:59' },
    { id: 5, start: '21:00', end: '23:59' }
  ];

  const WEEKENDS = [
    { id: 1, start: '00:00', end: '08:59' },
    { id: 2, start: '09:00', end: '17:59' },
    { id: 3, start: '18:00', end: '23:59' }
  ];

  export let type: RateTypes;
</script>

{#if type === 'weekdays'}
  <div>
    {#each WEEKDAYS as rate}
      <div>{rate.start} - {rate.end}</div>
    {/each}
  </div>
{/if}
{#if type === 'weekends'}
  <div>
    {#each WEEKENDS as rate}
      <div>{rate.start} - {rate.end}</div>
    {/each}
  </div>
{/if}
{#if type === 'holidays'}
  <div>Select holidays</div>
{/if}
{#if type === 'flatrate'}
  <div>Enter flatrate</div>
{/if}
