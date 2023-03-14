import { prisma } from '$lib/server/database';
import type { Customer, Level, ParkingTicket } from '@prisma/client';
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

    estimatedRevenue += await calculateEstimatedForParkingTicket(
      parkingTicket,
      Customer,
      level.parking_garage_id
    );
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

///TODO: implement
// async function getReportForTimePeriod(parkingSpace: ParkingSpace, startTime: Date , endTime: Date ): Promise<Report> {

//get all exit tickets in time period
//calculate revenue
//add curent occupaied parking spaces (they dont have an exit ticket yet)
// }

async function calculateEstimatedForParkingTicket(
  parkingTicket: ParkingTicket,
  customer: Customer,
  garageId: number
): Promise<number> {
  const rate = 5;
  const maxHoursBeforeFlatRate = 24;

  if (customer.is_long_term_customer) return 0;

  //always round up
  const timeDifferenceInHours = Math.ceil(
    (Date.now() - parkingTicket.entry_date.getTime()) / 1000 / 60 / 60
  );
  if (timeDifferenceInHours >= 24) {
    return Math.ceil(timeDifferenceInHours / maxHoursBeforeFlatRate) * rate;
  }
  ///TODO: implement different rates
  // const rates = await prisma.parkingRate.findFirst({
  //     where: {
  //         parking_garage_id: garageId
  //     }
  // });
  // if(!rates) return 0;

  return timeDifferenceInHours * rate;
}

///TODO: implement rates and cap at daily rate
// function calculateRates(){

// }
