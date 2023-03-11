import { prisma } from '$lib/server/database';
import { getAllParkingSpacesForLevel } from '$lib/util/parkingSpaceUtil';
import { getReportForLevel, type Report } from '$lib/util/reports';
import type { Level } from '@prisma/client';
import type { PageServerLoad } from './$types';

export type LevelInfo = {
  level: Level;
  parking_spaces: boolean[];
  report: Report;
};
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
        parking_spaces: parkingSpaces.map((parkingSpace) => parkingSpace.occupied),
        report: report
      };
    })
  );

  return { levelInfo };
}) satisfies PageServerLoad;
