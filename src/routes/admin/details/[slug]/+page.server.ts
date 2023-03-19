import { prisma } from '$lib/server/database';
import { getAllParkingSpacesForLevel } from '$lib/util/parkingSpaceUtil';
import { getReportForLevel } from '$lib/util/reports';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const levels = await prisma.level.findMany({
    where: {
      parking_garage_id: Number(params.slug)
    },
    orderBy: {
      levelNumber: 'asc'
    }
  });

  const levelInfo = await Promise.all(
    levels.map(async (level) => {
      const report = await getReportForLevel(level);
      const parkingSpaces = await getAllParkingSpacesForLevel(level);
      return {
        level: level,
        parking_spaces: parkingSpaces.map((parkingSpace) => ({
          occupied: parkingSpace.occupied,
          permanentTenant: parkingSpace.permanentTenant
        })),
        report: report
      };
    })
  );

  return { levelInfo };
}) satisfies PageServerLoad;
