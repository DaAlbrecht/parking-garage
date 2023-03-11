import { prisma } from '$lib/server/database';
import type { Level } from '.prisma/client';

export interface LevelParkingSpace {
  parkingSpot: number;
  occupied: boolean;
  level_id: number;
}
async function getOccupiedParkingSpacesForLevel(level: Level): Promise<Array<number>> {
  const parkingSpaces = await prisma.parkingSpace.findMany({
    where: {
      level_id: level.id
    }
  });
  return parkingSpaces.map((parkingSpace) => parkingSpace.parkingSpot);
}

export async function getAllParkingSpacesForLevel(level: Level): Promise<LevelParkingSpace[]> {
  const occupiedParkingSpaces = await getOccupiedParkingSpacesForLevel(level);
  const parkingSpaces = new Array<LevelParkingSpace>();
  for (let i = 0; i < level.parking_spaces; i++) {
    parkingSpaces.push({
      parkingSpot: i,
      occupied: occupiedParkingSpaces.includes(i),
      level_id: level.id
    });
  }
  return parkingSpaces;
}

export async function getOccupancyForLevel(level: Level): Promise<number> {
  const occupiedParkingSpaces = await getOccupiedParkingSpacesForLevel(level);
  if (occupiedParkingSpaces.length === 0) return 0;
  return occupiedParkingSpaces.length / level.parking_spaces;
}
