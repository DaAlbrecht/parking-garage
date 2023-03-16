import { prisma } from '$lib/server/database';
import { getInitialParkingRatesForGarage } from '$lib/util/parkingRates';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  createGarage: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const address = data.get('address');

    if (!name || !address) return fail(422, { error: 'Missing name or address' });

    const nameString = name.toString();
    const addressString = address.toString();

    try {
      const garage = await prisma.parkingGarage.create({
        data: {
          name: nameString,
          address: addressString
        }
      });
      await prisma.parkingRate.createMany({
        data: getInitialParkingRatesForGarage(garage.id)
      });
    } catch (error) {
      console.error(error);
      return fail(422, { error: 'Garage already exists' });
    }
    throw redirect(303, '/admin');
  },
  deleteGarage: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');

    if (!id) return fail(422, { error: 'Missing id' });

    const idNumber = Number(id);

    try {
      await prisma.parkingGarage.delete({
        where: {
          id: idNumber
        }
      });
    } catch (error) {
      return fail(422, { error: 'Garage does not exist' });
    }
    throw redirect(303, '/admin');
  }
} satisfies Actions;
