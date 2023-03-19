import { prisma } from '$lib/server/database';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const report = await prisma.accountingReport.findFirst({
    where: {
      id: Number(params.slug)
    },
    include: {
      parkingGarage: true
    }
  });

  if (!report) {
    throw error(404, 'Not found');
  }
  return { report: report };
}) satisfies PageServerLoad;
