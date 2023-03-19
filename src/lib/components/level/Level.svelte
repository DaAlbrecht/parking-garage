<script lang="ts">
  import './level.css';
  import type { LevelInfo } from '../../../routes/admin/details/[slug]/+page.server';
  import { createEventDispatcher } from 'svelte';
  export let levelInfo: LevelInfo;

  const dispatch = createEventDispatcher();

  $: occupencyPercentage = (levelInfo.report.occupancy * 100).toFixed(2);

  function getOccupancyClass() {
    if (levelInfo.report.occupancy < 0.4) {
      return 'progress-success';
    } else if (levelInfo.report.occupancy < 0.85) {
      return 'progress-warning';
    } else {
      return 'progress-error';
    }
  }
</script>

<div
  class="card bg-base-100 shadow-xl"
  on:click={() => dispatch('expand')}
  on:keydown={() => dispatch('expand')}
>
  <div class="card-body px-4">
    <h2 class="card-title">Level: {levelInfo.level.levelNumber}</h2>
    <div class="stats stats-vertical shadow">
      <div class="stat">
        <div class="stat-title">Estimated Revenue</div>
        <div class="stat-value">{levelInfo.report.estimatedRevenue}</div>
        <div class="stat-desc">Jan 1st - Feb 1st</div>
      </div>

      <div class="stat">
        <div class="stat-title">Level Occupancy</div>
        <div class="stat-value">{occupencyPercentage} %</div>
        <div class="stat-desc">avg. (22%)</div>
        <div>
          <progress
            class={`progress w-full ${getOccupancyClass()}`}
            value={occupencyPercentage}
            max="100"
          />
        </div>
      </div>

      <div class="stat">
        <div class="stat-title">Permanent Tenants</div>
        <div class="stat-value">{levelInfo.report.permanentTenants}</div>
        <div class="stat-desc">↘︎ 90 (14%)</div>
      </div>
    </div>
  </div>
</div>
