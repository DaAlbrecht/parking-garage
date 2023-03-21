import { prisma } from '$lib/server/database';
import { getReportForGarage } from '$lib/util/reports';
import { RateType, type ParkingGarage } from '@prisma/client';
import { error, redirect } from '@sveltejs/kit';
import { DateTime } from 'luxon';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const garages = await prisma.parkingGarage.findMany();
  if (!garages) throw error(404, 'No garages found');
  return { garages: garages };
}) satisfies PageServerLoad;

export const actions = {
  generateReport: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    const from = data.get('from');
    const to = data.get('to');
    const isPermanentTenant = data.get('customerType');

    if (!id || !from || !to) {
      throw error(500, 'Missing parameters');
    }

    const startTime = new Date(from.toString());
    const endTime = new Date(to.toString());

    const garage = await prisma.parkingGarage.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!garage) {
      throw error(500, 'Missing garage');
    }
    let combinedRevenue = 0;
    let numberOfTickets = 0;

    if (isPermanentTenant === 'true') {
      const info = await reportPermanentTenants(garage, startTime, endTime);
      combinedRevenue = info.revenue;
      numberOfTickets = info.numberOfTickets;
    } else {
      const info = await infoFromPeriod(garage, startTime, endTime);
      const estimatedRevenue = await getReportForGarage(garage.id);
      combinedRevenue = info.revenue + estimatedRevenue.estimatedRevenue;
      numberOfTickets = info.numberOfTickets;
    }

    const report = await prisma.accountingReport.create({
      data: {
        parking_garage_id: garage.id,
        generationTime: new Date(),
        searchFrom: startTime,
        searchTo: endTime,
        price: combinedRevenue,
        numberOfTickets: numberOfTickets
      }
    });

    throw redirect(303, `/accounting/report/${report.id}`);
  }
};

async function infoFromPeriod(garage: ParkingGarage, startTime: Date, endTime: Date) {
  const tickets = await prisma.parkingTicket.findMany({
    where: {
      parking_garage_id: garage.id,
      exit_date: {
        gte: startTime,
        lte: endTime
      }
    },
    include: {
      customer: true
    }
  });

  if (!tickets) return { revenue: 0, numberOfTickets: 0 };

  const numberOfTickets = tickets.filter(
    (ticket) => ticket.customer?.is_long_term_customer !== true
  ).length;

  const revenue = tickets.reduce((acc, ticket) => acc + ticket.finalprice!, 0);

  return { revenue: revenue, numberOfTickets: numberOfTickets };
}

async function reportPermanentTenants(garage: ParkingGarage, startTime: Date, endTime: Date) {
  const customers = await prisma.customer.findMany({
    where: {
      parking_garage_id: garage.id,
      is_long_term_customer: true,
      created_at: {
        lte: endTime
      },
      last_payment: {
        gte: startTime
      }
    },
    include: {
      parkingTickets: true
    }
  });

  const monthRate = await prisma.parkingRate.findFirst({
    where: {
      parking_garage_id: garage.id,
      rateType: RateType.MONTHRATE
    }
  });

  if (!monthRate) {
    throw new Error('No month rate found for this parking garage');
  }

  let revenue = 0;
  let numberOfTickets = 0;
  for (const customer of customers) {
    numberOfTickets += customer.parkingTickets.length;
    let start = DateTime.fromJSDate(customer.created_at!);
    let end = DateTime.fromJSDate(customer.last_payment!);
    if (DateTime.fromJSDate(startTime) > DateTime.fromJSDate(customer.created_at!)) {
      start = DateTime.fromJSDate(startTime);
    }
    if (DateTime.fromJSDate(endTime) < DateTime.fromJSDate(customer.last_payment!)) {
      end = DateTime.fromJSDate(endTime);
    }

    let current = start;
    while (current <= end) {
      revenue += monthRate.price!;
      current = current.plus({ months: 1 });
    }
  }
  return { revenue: revenue, numberOfTickets: numberOfTickets };
}
