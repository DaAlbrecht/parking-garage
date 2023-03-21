import { prisma } from '$lib/server/database';
import { getAllParkingSpacesForLevel } from '$lib/util/parkingSpaceUtil';
import { getReportForLevel } from '$lib/util/reports';
import type { ParkingGarage } from '@prisma/client';
import { debug } from 'console';
import { DateTime } from 'luxon';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const garages = await prisma.parkingGarage.findMany();

  const startTime = DateTime.fromJSDate(new Date(new Date().getFullYear(), 0, 1));
  const endTime = DateTime.fromJSDate(new Date(new Date().getFullYear(), 11, 31));
  let current = startTime;

  // const garageInfo = await Promise.all(
  //   garages.map(async (garage) => {
  //     while (current < endTime) {
  //       const revenue = await getPrice(garage, current);
  //       current = current.plus({ months: 1 });
  //     }
  //     current = startTime;
  //     return { garage };
  //   })
  // );
  const garageInfo = [
    {
      id: 1,
      name: 'Garage 1',
      totalRevenue: 100,
      monthlyRevenue: [
        {
          revenue: 100,
          month: 'January'
        },
        {
          revenue: 0,
          month: 'February'
        },
        {
          revenue: 20,
          month: 'march'
        },
        {
          revenue: 0,
          month: 'April'
        },
        {
          revenue: 0,
          month: 'May'
        },
        {
          revenue: 0,
          month: 'June'
        },
        {
          revenue: 0,
          month: 'July'
        }
      ]
    },
    {
      id: 2,
      name: 'Garage 2',
      totalRevenue: 200,
      monthlyRevenue: [
        {
          revenue: 100,
          month: 'January'
        },
        {
          revenue: 0,
          month: 'February'
        }
      ]
    }
  ];
  return { garageInfo };
}) satisfies PageServerLoad;

async function getPrice(garage: ParkingGarage, current: DateTime) {
  const parkingTickets = await prisma.parkingTicket.findMany({
    where: {
      parking_garage_id: garage.id,
      exit_date: {
        gte: current.toJSDate(),
        lte: current.plus({ months: 1 }).toJSDate()
      }
    }
  });

  const revenue = parkingTickets.reduce((acc, ticket) => {
    if (ticket.finalprice != null) return acc + ticket.finalprice;
    return acc;
  }, 0);

  return revenue;
}
