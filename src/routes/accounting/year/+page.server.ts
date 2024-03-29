import { prisma } from '$lib/server/database';
import type { ParkingGarage } from '@prisma/client';
import { DateTime } from 'luxon';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const garages = await prisma.parkingGarage.findMany();

  const startTime = DateTime.fromJSDate(new Date(new Date().getFullYear(), 0, 1));
  const endTime = DateTime.fromJSDate(new Date(new Date().getFullYear(), 11, 31));
  let current = startTime;

  const garageInfo = [];
  for (const garage of garages) {
    const monthlyRevenue = [];
    let totalRevenue = 0;
    while (current < endTime) {
      const revenue = await getPrice(garage, current);
      monthlyRevenue.push({
        revenue,
        month: current.monthLong
      });
      totalRevenue += revenue;
      current = current.plus({ months: 1 });
    }
    current = startTime;
    garageInfo.push({ id: garage.id, name: garage.name, monthlyRevenue, totalRevenue });
  }
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
