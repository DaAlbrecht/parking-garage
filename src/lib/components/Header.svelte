<script lang="ts">
  export let route: string | null;
</script>

<div>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a href="/" class="btn-ghost btn text-xl normal-case">myGarage</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal gap-3 px-1">
        <li><a class:active={route === '/' || route?.includes('/garage')} href="/">Garage</a></li>
        <li><a class:active={route?.includes('/admin')} href="/admin">Admin</a></li>
        <li><a class:active={route?.includes('/accounting')} href="/accounting">Accounting</a></li>
      </ul>
    </div>
  </div>
</div>
