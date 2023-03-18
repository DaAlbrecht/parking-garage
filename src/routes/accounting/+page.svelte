<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  let data: PageData;
  let id: number;
</script>

<div>
  <p>New report generate</p>
  <p>Check old reports</p>
  <p>Reports display earning for longer periods. Levels only display current month</p>

  <form method="POST" action="?/generateReport" use:enhance>
    <input type="number" name="id" value={id} placeholder="garage" />
    <input type="date" name="from" />
    <input type="date" name="to" />
    <select name="customerType">
      <option value="true">Permanent tenant</option>
      <option value="false">Occasional users</option>
    </select>
    <button>Generate report</button>
  </form>
  <!-- ADD: yearly report button, should split view on a monthly basis, prob implement /accounting/yearlyReport in the backend that returns a list of monthly reports -->
</div>
