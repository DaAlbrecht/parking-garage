<script lang="ts">
  import type { PageData } from './$types';
  import AdminChildLayout from '../../ChildLayout.svelte';
</script>

<AdminChildLayout backLink="/accounting">
  <div>
    <form method="POST" action="?/generateReport">
      <input type="number" name="id" placeholder="garage" />
      <input type="date" name="from" />
      <input type="date" name="to" />
      <select name="customerType">
        <option value="true">Permanent tenant</option>
        <option value="false">Occasional users</option>
      </select>
      <button>Generate report</button>
    </form>
  </div>
</AdminChildLayout>
