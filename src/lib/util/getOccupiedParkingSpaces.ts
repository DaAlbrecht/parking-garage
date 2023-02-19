import { prisma } from '$lib/server/database';
import type { Level, ParkingSpace } from '.prisma/client';

export async function getOccupiedParkingSpaces(levels: Level[]): Promise<ParkingSpace[]> {
	//get all occupied parkingSpaces
	const parkingSpaces = await Promise.all(
		levels.map(async (level) => {
			return await prisma.parkingSpace.findMany({
				where: {
					level_id: level.id
				}
			});
		})
	);
	return parkingSpaces.flat();
}
