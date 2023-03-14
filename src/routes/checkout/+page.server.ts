import { prisma } from '$lib/server/database';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
export const actions = {
  exitGarage: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    const customerId = data.get('customerId');

    if (!id || !customerId) return fail(422, { error: 'Missing parameters' });

    const customer = await prisma.customer.findFirst({
      where: {
        id: customerId.toString(),
        parking_garage_id: Number(id)
      }
    });

    if (!customer) return fail(422, { error: 'Customer does not exist' });

    if (customer.is_long_term_customer && !customer.is_blocked) {
      await prisma.exitTicket.create({
        data: {
          customer_id: customer.id,
          parking_garage_id: customer.parking_garage_id,
          price: 0,
          exit_date: new Date()
        }
      });

      return { status: 200 };
    } else if (!customer.is_long_term_customer) {
      const exitTicket = await prisma.exitTicket.create({
        data: {
          customer_id: customer.id,
          parking_garage_id: customer.parking_garage_id,
          price: 0,
          exit_date: new Date()
        }
      });

      await prisma.parkingSpace.deleteMany({
        where: {
          customer_id: customer.id
        }
      });
    }
  }
} satisfies Actions;
