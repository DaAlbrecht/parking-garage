import { prisma } from '$lib/server/database';
import { getArrayOfOccupiedParkingSpaces } from '$lib/util/parkingSpaceUtil';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const levels = await prisma.level.findMany({
		where: {
			parking_garage_id: Number(params.slug)
		}
	});
	const occupiedParkingSpaces = await getArrayOfOccupiedParkingSpaces(levels);
	return { levels: levels, occupiedParkingSpaces: occupiedParkingSpaces };
}) satisfies PageServerLoad;
