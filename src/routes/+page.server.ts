import { prisma } from '$lib/server/database';
import { error, fail, redirect } from '@sveltejs/kit';
import { findEmptyParkingSpace, occupySpot } from '$lib/util/findEmptyParkingSpace';
import type { Actions, PageServerLoad } from './$types';
import type { Customer } from '@prisma/client';
import { calculatePrice } from '$lib/util/accounting';

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
      throw redirect(303, `/user/${customer.id}`);
    }

    const levelParkingSpace = await findEmptyParkingSpace(garage);

    if (!levelParkingSpace) return fail(422, { error: 'No parking space available' });

    const parkingSpace = await occupySpot(levelParkingSpace, garage, null, id.toString());

    if (!parkingSpace) {
      throw error(404, {
        message: 'Could not receive parking space'
      });
    }
    throw redirect(303, `/user/${parkingSpace.customer_id}`);
  },
  exitGarage: async ({ request }) => {
    const data = await request.formData();
    const customerId = data.get('customerId');

    if (!customerId) return fail(422, { error: 'Missing parameters' });

    const customer = await prisma.customer.findFirst({
      where: {
        id: customerId.toString()
      }
    });
    if (!customer) return fail(422, { error: 'Customer does not exist' });

    const parkingTicket = await prisma.parkingTicket.findFirst({
      where: {
        customer_id: customer.id
      },
      orderBy: {
        id: 'desc'
      }
    });
    if (!parkingTicket) return fail(422, { error: 'Parking ticket does not exist' });

    const price = await calculatePrice(parkingTicket);
    await prisma.parkingTicket.update({
      where: {
        id: parkingTicket.id
      },
      data: {
        finalprice: price,
        exit_date: new Date()
      }
    });

    if (customer.is_long_term_customer === false) {
      await prisma.customer.delete({
        where: {
          id: customer.id
        }
      });
    }

    throw redirect(303, `/`);
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
  const garages = await prisma.parkingGarage.findMany({
    where: {
      levels: {
        some: {}
      }
    }
  });
  return { garages: garages };
}) satisfies PageServerLoad;
