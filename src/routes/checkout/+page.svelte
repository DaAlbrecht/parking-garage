<script>
  import { enhance } from '$app/forms';
</script>

<div>
  <form method="POST" action="?/exitGarage" use:enhance>
    <input type="hidden" name="garage" value={''} />
    <input type="hidden" name="id" value={''} />
    <div class="form-control mt-6">
      <button class="btn-primary btn-lg btn">Check out</button>
    </div>
  </form>
</div>
