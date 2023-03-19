<script lang="ts">
  import type { PageData } from './$types';
  import Login from '$lib/components/Login.svelte';

  export let data: PageData;
</script>

<div class="relative h-full">
  <div class="bg-base-200 p-20">
    <div class="flex justify-between gap-12">
      <div class="flex w-1/2 flex-col justify-around">
        <h1 class="text-5xl font-bold">Welcome!</h1>
        <div class="flex flex-col justify-between">
          <p class="py-6">
            Select your garage, then provide your register plate number. If you are a permanent
            tenant please enter your customer id.
          </p>
          <p>info@parkinggarages.ch | +41 00 000 00 00</p>
        </div>
      </div>
      <Login garages={data.garages} />
    </div>
  </div>
</div>
