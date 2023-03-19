import { prisma } from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const reports = await prisma.accountingReport.findMany({
    orderBy: {
      generationTime: 'desc'
    },
    include: {
      parkingGarage: true
    }
  });
  return { reports: reports };
}) satisfies PageServerLoad;
