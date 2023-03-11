import { prisma } from '$lib/server/database';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async () => {
  const garages = await prisma.parkingGarage.findMany();
  return { garages: garages };
};

export const actions: Actions = {
  createGarage: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const address = data.get('address');

    if (!name || !address) return fail(422, { error: 'Missing name or address' });

    const nameString = name.toString();
    const addressString = address.toString();

    try {
      await prisma.parkingGarage.create({
        data: {
          name: nameString,
          address: addressString
        }
      });
    } catch (error) {
      return fail(422, { error: 'Garage already exists' });
    }
    throw redirect(303, '/admin');
  }
};
