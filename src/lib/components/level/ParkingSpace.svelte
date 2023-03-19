<script lang="ts">
  export let occupied: boolean;
  export let permanant: boolean;
  export let label: string | number;
</script>

<div
  class={`flex h-32 w-full items-center ${
    occupied ? (permanant ? 'bg-orange-700' : 'bg-red-700') : 'bg-green-700'
  } bg-opacity-50`}
>
  <div class="w-full text-center">
    <span>{label} </span>
  </div>
</div>
