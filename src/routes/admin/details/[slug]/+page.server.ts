import { prisma } from '$lib/server/database';
import { getAllParkingSpacesForLevel } from '$lib/util/parkingSpaceUtil';
import type { Level } from '@prisma/client';
import type { PageServerLoad } from './$types';

export type LevelInfo = {
	level : Level
	parking_spaces: Array<boolean>;
}
export const load = (async ({ params }) => {
	const levels = await prisma.level.findMany({
		where: {
			parking_garage_id: Number(params.slug)
		}
	});
	const parkingSpaceInfos = new Array<LevelInfo>();
	for(const level of levels) {
		const parkingSpaces = await getAllParkingSpacesForLevel(level);
		parkingSpaceInfos.push({
			level: level,
			parking_spaces: parkingSpaces.map((parkingSpace) => parkingSpace.occupied)
		});
	}
	return {parkingSpaceInfos : parkingSpaceInfos };
}) satisfies PageServerLoad;
