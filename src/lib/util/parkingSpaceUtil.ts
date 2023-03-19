import { prisma } from '$lib/server/database';
import type { Level } from '.prisma/client';

async function getOccupiedParkingSpacesForLevel(level: Level): Promise<Array<number>> {
  const parkingSpaces = await prisma.parkingSpace.findMany({
    where: {
      level_id: level.id
    }
  });
  return parkingSpaces.map((parkingSpace) => parkingSpace.parkingSpot);
}

export async function getAllParkingSpacesForLevel(level: Level) {
  const occupiedParkingSpaces = await getOccupiedParkingSpacesForLevel(level);
  const parkingSpaces = [];
  for (let i = 0; i < level.parking_spaces; i++) {
    if (occupiedParkingSpaces.includes(i)) {
      const parkingSpace = await prisma.parkingSpace.findFirst({
        where: {
          level_id: level.id,
          parkingSpot: i
        }
      });
      if (!parkingSpace) continue;
      if (parkingSpace.customer_id === null) continue;

      const customer = await prisma.customer.findFirst({
        where: {
          id: parkingSpace.customer_id
        }
      });
      if (!customer) continue;

      parkingSpaces.push({
        parkingSpot: i,
        occupied: true,
        level_id: level.id,
        permanentTenant: customer.is_long_term_customer
      });
    } else {
      parkingSpaces.push({
        parkingSpot: i,
        occupied: false,
        level_id: level.id,
        permanentTenant: false
      });
    }
  }
  return parkingSpaces;
}

export async function getOccupancyForLevel(level: Level): Promise<number> {
  const occupiedParkingSpaces = await getOccupiedParkingSpacesForLevel(level);
  if (occupiedParkingSpaces.length === 0) return 0;
  return occupiedParkingSpaces.length / level.parking_spaces;
}
