import { prisma } from '$lib/server/database';
import type { Customer, Level, ParkingTicket } from '@prisma/client';
import { calculatePrice } from './accounting';
import { getOccupancyForLevel } from './parkingSpaceUtil';

export interface Report {
  occupancy: number;
  estimatedRevenue: number;
  permanentTenants: number;
}

export async function getReportForLevel(level: Level): Promise<Report> {
  const occupancy = await getOccupancyForLevel(level);
  let estimatedRevenue = 0;
  let permanentTenants = 0;
  const parkingSpaces = await prisma.parkingSpace.findMany({
    where: {
      level_id: level.id
    }
  });

  for (const parkingSpace of parkingSpaces) {
    const parkingTicket = await prisma.parkingTicket.findFirst({
      where: {
        customer_id: parkingSpace.customer_id
      }
    });
    if (!parkingTicket) continue;

    const Customer = await prisma.customer.findFirst({
      where: {
        id: parkingTicket.customer_id
      }
    });

    if (!Customer) continue;

    if (Customer.is_long_term_customer) permanentTenants++;

    estimatedRevenue += await calculatePrice(parkingTicket);
  }
  return {
    occupancy: occupancy,
    estimatedRevenue: estimatedRevenue,
    permanentTenants: permanentTenants
  };
}

export async function getReportForGarage(garageId: number): Promise<Report> {
  const levels = await prisma.level.findMany({
    where: {
      parking_garage_id: garageId
    }
  });

  let occupancy = 0;
  let estimatedRevenue = 0;
  let permanentTenants = 0;

  for (const level of levels) {
    const report = await getReportForLevel(level);
    occupancy += report.occupancy;
    estimatedRevenue += report.estimatedRevenue;
    permanentTenants += report.permanentTenants;
  }

  return {
    occupancy,
    estimatedRevenue,
    permanentTenants
  };
}
