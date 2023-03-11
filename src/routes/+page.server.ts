import { prisma } from '$lib/server/database';
import { fail } from '@sveltejs/kit';
import { findEmptyParkingSpace, occupySpot } from '$lib/util/findEmptyParkingSpace';
import type { Actions, PageServerLoad } from './$types';
import type { Customer, ParkingGarage } from '@prisma/client';

export const actions: Actions = {
  longTermCustomer: async ({ request }) => {
    const data = await request.formData();

    const id = data.get('id');
    const garage = data.get('garage');

    if (!id) return fail(422, { error: 'Missing id' });
    if (!garage) return fail(422, { error: 'Missing parkingGarages' });

    const idString = id.toString();
    const garageNumber = Number(garage);

    const customer = await prisma.customer.findFirst({
      where: {
        id: idString,
        parking_garage_id: garageNumber
      }
    });

    if (!customer) return fail(422, { error: 'Customer does not exist' });

    getPermanentTenantParkingSpot(garageNumber, customer);

    return { status: 20 };
  },
  getParkingSpot: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    console.log(id);
    if (!id) return fail(422, { error: 'Missing id' });
    const idNumber = Number(id);
    const garage = await prisma.parkingGarage.findUnique({
      where: {
        id: idNumber
      }
    });
    if (!garage) return fail(422, { error: 'Garage does not exist' });

    const levelParkingSpace = await findEmptyParkingSpace(garage);

    if (!levelParkingSpace) return fail(422, { error: 'No parking space available' });

    occupySpot(levelParkingSpace, garage, null);
  }
};

async function getPermanentTenantParkingSpot(garageNumber: number, customer: Customer) {
  const garage = await prisma.parkingGarage.findUnique({
    where: {
      id: garageNumber
    }
  });

  if (!garage) return fail(422, { error: 'Garage does not exist' });

  const levelParkingSpace = await findEmptyParkingSpace(garage);

  if (!levelParkingSpace) return fail(422, { error: 'No parking space available' });

  occupySpot(levelParkingSpace, garage, customer);
}

export const load = (async () => {
  const garages = await prisma.parkingGarage.findMany();
  return { garages: garages };
}) satisfies PageServerLoad;
