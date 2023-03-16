import { prisma } from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const customer = await prisma.customer.findFirst();
  return { customer: customer };
}) satisfies PageServerLoad;
