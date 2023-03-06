import { prisma } from '$lib/server/database';
import type { ParkingGarage, ParkingSpace, Level } from '.prisma/client';
import { getAllParkingSpacesForLevel, getOccupancyForLevel } from './parkingSpaceUtil';

export async function findEmptyParkingSpace(garage: ParkingGarage): Promise<ParkingSpace | null> {
	const levels = await prisma.level.findMany({
		where: {
			parking_garage_id: garage.id
		}
	});

	let lastOccupancy = 100;
	let leastOccupiedLevel: Level | null = null;
	for (const level of levels) {
		const current = await getOccupancyForLevel(level);
		if (current < lastOccupancy) {
			lastOccupancy = current;
			leastOccupiedLevel = level;
		}
	}
	if (!leastOccupiedLevel) return null;
	const parkingSpaces = await getAllParkingSpacesForLevel(leastOccupiedLevel);
	if (parkingSpaces.length === 0) return null;

	
	//find the first parking space that is not occupied
	const freeParkingSpace = parkingSpaces.find((parkingSpace) => !parkingSpace.occupied);
	if (freeParkingSpace) {
		const parkingSpace = await prisma.parkingSpace.create({
			data: {
				parkingSpot: freeParkingSpace.parkingSpot,
				level_id: leastOccupiedLevel.id,
				customer_id: 1
			}
		});
		if(parkingSpace){
		 	await prisma.parkingTicket.create({
				data: {
					customer_id: 1,
					entry_date: new Date(),
					parking_garage_id: garage.id,
				}
			});
		}
		return parkingSpace;
	}

	return null;
}
