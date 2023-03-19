import { prisma } from '$lib/server/database';
import type { ParkingGarage, ParkingSpace, Level } from '.prisma/client';
import type { Customer } from '@prisma/client';
import { getAllParkingSpacesForLevel, getOccupancyForLevel } from './parkingSpaceUtil';

export async function findEmptyParkingSpace(garage: ParkingGarage) {
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

  if (!freeParkingSpace) return null;

  return freeParkingSpace;
}

export async function occupySpot(
  levelParkingSpace: {
    parkingSpot: any;
    occupied?: boolean;
    level_id: any;
    permanentTenant?: boolean;
  },
  garage: ParkingGarage,
  customer: Customer | null,
  numberPlate: string | null
): Promise<ParkingSpace | null> {
  let parkingSpace: ParkingSpace | null = null;

  if (!customer) {
    customer = await prisma.customer.create({
      data: {
        is_long_term_customer: false,
        is_blocked: false,
        parking_garage_id: garage.id,
        license_plate: numberPlate
      }
    });
    parkingSpace = await prisma.parkingSpace.create({
      data: {
        parkingSpot: levelParkingSpace.parkingSpot,
        level_id: levelParkingSpace.level_id,
        customer_id: customer.id
      }
    });
  } else {
    if (customer.is_blocked) return null;

    parkingSpace = await prisma.parkingSpace.findFirst({
      where: {
        customer_id: customer.id
      }
    });
    if (!parkingSpace) {
      parkingSpace = await prisma.parkingSpace.create({
        data: {
          parkingSpot: levelParkingSpace.parkingSpot,
          level_id: levelParkingSpace.level_id,
          customer_id: customer.id
        }
      });
    }
  }

  if (parkingSpace) {
    await prisma.parkingTicket.create({
      data: {
        customer_id: customer.id,
        entry_date: new Date(),
        parking_garage_id: garage.id
      }
    });
  }
  return parkingSpace;
}
