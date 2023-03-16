<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div>Welcome {data.customer?.id}</div>
<div>Your currently parking in garage:</div>
<div>At spot:</div>
<div>Current price:</div>
