import { prisma } from '$lib/server/database';
import { fail, redirect } from '@sveltejs/kit';
import { findEmptyParkingSpace, occupySpot } from '$lib/util/findEmptyParkingSpace';
import type { Actions, PageServerLoad } from './$types';
import type { Customer, ParkingGarage } from '@prisma/client';

export const actions = {
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

    if (customer.is_blocked) return fail(422, { error: 'Customer is blocked' });

    getPermanentTenantParkingSpot(garageNumber, customer);

    return { status: 20 };
  },
  getParkingSpot: async ({ request }) => {
    const data = await request.formData();
    const garageId = data.get('garage');
    const id = data.get('id');
    if (!id || !garageId) return fail(422, { error: 'Missing params' });

    const garage = await prisma.parkingGarage.findUnique({
      where: {
        id: Number(garageId)
      }
    });
    if (!garage) return fail(422, { error: 'Garage does not exist' });

    const customer = await prisma.customer.findFirst({
      where: {
        license_plate: id.toString(),
        parking_garage_id: Number(garageId)
      }
    });

    if (customer) {
      throw redirect(303, '/checkout');
    }

    const levelParkingSpace = await findEmptyParkingSpace(garage);

    if (!levelParkingSpace) return fail(422, { error: 'No parking space available' });

    occupySpot(levelParkingSpace, garage, null, id.toString());

    throw redirect(303, '/checkout');
  }
} satisfies Actions;

async function getPermanentTenantParkingSpot(garageNumber: number, customer: Customer) {
  const garage = await prisma.parkingGarage.findUnique({
    where: {
      id: garageNumber
    }
  });

  if (!garage) return fail(422, { error: 'Garage does not exist' });

  const levelParkingSpace = await findEmptyParkingSpace(garage);

  if (!levelParkingSpace) return fail(422, { error: 'No parking space available' });

  occupySpot(levelParkingSpace, garage, customer, null);
}

export const load = (async () => {
  const garages = await prisma.parkingGarage.findMany();
  return { garages: garages };
}) satisfies PageServerLoad;
