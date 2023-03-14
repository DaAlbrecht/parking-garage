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
          <pre>- Select a garage</pre>
          <pre>- Prompt for anonymous login with register plate or permanent tenant id</pre>
          <pre>- Check if user is already checked if, if yes, go to checkout</pre>
          <pre>- Park. You get assigned a spot. On this page prices can be shown</pre>
        </code>
      </div>
      <Login garages={data.garages} />
    </div>
  </div>
</div>
