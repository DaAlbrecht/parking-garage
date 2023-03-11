<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';
  export let data: PageData;
  import AdminChildLayout from '../../AdminChildLayout.svelte';
</script>

<AdminChildLayout>
  <div>
    {#if data.garage}
      <div class="flex w-full">
        <div class="card rounded-box grid shrink-0 grow justify-center bg-base-300 py-3">
          <h1 class="mb-2 text-center text-2xl">Garage: {data.garage.name}</h1>
          <form
            method="POST"
            action="?/updateGarage"
            use:enhance={() => {
              return async ({ update }) => {
                await update({ reset: false });
              };
            }}
            class="flex items-end gap-2"
          >
            <input type="hidden" name="id" value={data.garage.id} />
            <div>
              <label class="label" for="name">
                <span class="label-text">Name:</span>
              </label>
              <input
                id="name"
                type="text"
                value={data.garage.name}
                name="name"
                class="input w-full max-w-xs"
              />
            </div>
            <div>
              <label class="label" for="address">
                <span class="label-text">Address:</span>
              </label>
              <input
                id="address"
                type="text"
                value={data.garage.address}
                name="address"
                class="input w-full max-w-xs"
              />
            </div>
            <button class="btn-success btn mt-2 gap-2">
              Save
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
          <form
            method="POST"
            action="/admin?/deleteGarage"
            use:enhance
            class="mt-4 flex flex-col items-center gap-2"
          >
            <input type="hidden" name="id" value={data.garage.id} />
            <button class="btn-warning btn w-full">
              Delete
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </form>
        </div>
        <div class="divider divider-horizontal" />
        <div class="card rounded-box grid shrink-0 grow justify-center bg-base-300 py-3">
          <h1 class="mb-2 text-center text-xl">Levels</h1>
          <div class="flex flex-col gap-2 text-center">
            {#each data.levels as level}
              <div class="flex items-center justify-center gap-1 text-center  ">
                <p class="mb-0 mr-2">Level: {level.levelNumber}</p>
                <form method="POST" action="?/parkingSpaces" use:enhance class="flex items-center">
                  <input type="hidden" name="id" value={level.id} />
                  <input
                    type="number"
                    name="parking_spaces"
                    class="input mr-1"
                    value={level.parking_spaces}
                  />
                  <button class="btn-squqare btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                  </button>
                </form>
                <form method="POST" action="?/deleteLevel" use:enhance class="flex items-center">
                  <input type="hidden" name="id" value={level.id} />
                  <button class="btn-squqare btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            {/each}
            <form class="flex flex-col gap-2" method="POST" action="?/addLevel" use:enhance>
              <input type="hidden" name="garageId" value={data.garage?.id} />
              <button class="btn-success btn mt-4 gap-2">
                Add
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    {:else}
      <h1>Garage not found</h1>
    {/if}
  </div>
</AdminChildLayout>
