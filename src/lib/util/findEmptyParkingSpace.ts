import { prisma } from '$lib/server/database';
import type { ParkingGarage, ParkingSpace } from '.prisma/client';
import { getOccupiedParkingSpaces } from './parkingSpaceUtil';

export async function findEmptyParkingSpace(garage: ParkingGarage): Promise<ParkingSpace | null> {
	const levels = await prisma.level.findMany({
		where: {
			parking_garage_id: garage.id
		}
	});
	const occupiedParkingSpaces = await getOccupiedParkingSpaces(levels);

	//find the level with the least percentage of occupied parking spaces
	const levelWithLeastOccupiedParkingSpaces = levels.reduce((prev, current) => {
		const occupiedParkingSpacesForLevel = occupiedParkingSpaces.filter(
			(parkingSpace) => parkingSpace.level_id === current.id
		);
		const percentageOccupied = occupiedParkingSpacesForLevel.length / current.parking_spaces;
		const percentageOccupiedPrev = prev
			? occupiedParkingSpaces.filter((parkingSpace) => parkingSpace.level_id === prev.id).length /
			  prev.parking_spaces
			: 1;
		return percentageOccupied < percentageOccupiedPrev ? current : prev;
	});

	const occupiedParkingSpaceForLevel = occupiedParkingSpaces.filter(
		(parkingSpace) => parkingSpace.level_id === levelWithLeastOccupiedParkingSpaces.id
	);

	//create array that has length of the parking space count but does not contain the index of the occupied parking spaces
	const emptyParkingSpaces = Array.from(
		{ length: levelWithLeastOccupiedParkingSpaces.parking_spaces },
		(_, i) => i
	).filter((i) => !occupiedParkingSpaceForLevel.map((p) => p.parkingSpot).includes(i));

	///TODO: useful error message if there are no empty parking spaces for this garage
	if (emptyParkingSpaces.length === 0) {
		return null;
	}

	const randomIndex = Math.floor(Math.random() * emptyParkingSpaces.length);
	const parkingSpace = await prisma.parkingSpace.create({
		data: {
			parkingSpot: emptyParkingSpaces[randomIndex],
			level: {
				connect: {
					id: levelWithLeastOccupiedParkingSpaces.id
				}
			},
			customer: {
				connect: {
					id: 1
				}
			}
		}
	});

	console.log(parkingSpace);
	return null;
}
