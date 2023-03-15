<script lang="ts">
  import type { PageData } from './$types';
  import Login from './Login.svelte';

  export let data: PageData;
</script>

<div class="relative h-full">
  <div class="bg-base-200 p-20">
    <div class="flex justify-between gap-12">
      <div class="mt-24 w-1/2">
        <h1 class="text-5xl font-bold">Welcome!</h1>
        <p class="py-6">
          Select your garage, then provide your register plate number. If you are a permanent tenant
          please enter your customer id.
        </p>
        <code>
          <pre>MI/DO: Styling finished rates edit & checkin</pre>
          <pre>FR: Display user page (current price etc.)</pre>
          <pre>FR: Styling Accounting & Reports</pre>
        </code>

        <code>
          <pre>Berechnung prices for estim, live and exited tickets</pre>
          <pre>Check if customer is already checked in</pre>
          <pre>Create garage with one level, prevent from removing last one</pre>
        </code>
      </div>
      <Login garages={data.garages} />
    </div>
  </div>
</div>
