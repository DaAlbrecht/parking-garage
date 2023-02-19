import { prisma } from '$lib/server/database';
import type { ParkingGarage, ParkingSpace } from '.prisma/client';

export async function findEmptyParkingSpace(garage: ParkingGarage): Promise<ParkingSpace | null> {
	const levels = await prisma.level.findMany({
		where: {
			parking_garage_id: garage.id
		}
	});

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
	const occupiedParkingSpacesFlat = parkingSpaces.flat();

	//find the level with the least amount of occupied parking spaces
	const levelWithLeastOccupiedParkingSpaces = levels.reduce((prev, current) => {
		const prevParkingSpaces = occupiedParkingSpacesFlat.filter(
			(parkingSpace) => parkingSpace.level_id === prev.id
		);
		const currentParkingSpaces = occupiedParkingSpacesFlat.filter(
			(parkingSpace) => parkingSpace.level_id === current.id
		);
		return prevParkingSpaces.length < currentParkingSpaces.length ? prev : current;
	});

	const occupiedParkingSpaceForLevel = occupiedParkingSpacesFlat.filter(
		(parkingSpace) => parkingSpace.level_id === levelWithLeastOccupiedParkingSpaces.id
	);

	//create array that has length of the parking space count but does not contain the index of the occupied parking spaces
	const emptyParkingSpaces = Array.from(
		{ length: levelWithLeastOccupiedParkingSpaces.parking_spaces },
		(_, i) => i
	).filter((i) => !occupiedParkingSpaceForLevel.map((p) => p.parkingSpot).includes(i));

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
