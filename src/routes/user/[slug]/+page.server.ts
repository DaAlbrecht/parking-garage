import { prisma } from '$lib/server/database';
import type { PageServerLoad } from './$types';
import { calculatePrice } from '$lib/util/accounting';

export const load = (async ({ params }) => {
  const customer = await prisma.customer.findFirst({
    where: {
      id: params.slug
    },
    include: {
      parkingGarage: true,
      parkingSpace: true,
      parkingTickets: true
    }
  });

  const price =
    customer && customer.is_long_term_customer === false
      ? await calculatePrice(customer.parkingTickets[0])
      : undefined;
  return { customer: customer, price: price };
}) satisfies PageServerLoad;
