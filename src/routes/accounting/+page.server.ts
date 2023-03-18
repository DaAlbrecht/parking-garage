import { prisma } from '$lib/server/database';
import { getReportForGarage, type Report } from '$lib/util/reports';
import { RateType, type ParkingGarage } from '@prisma/client';

import { DateTime } from 'luxon';

export const actions = {
  generateReport: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    const from = data.get('from');
    const to = data.get('to');
    const isPermanentTenant = data.get('customerType');

    if (!id || !from || !to) {
      return { error: 'Missing parameters' };
    }

    const startTime = new Date(from.toString());
    const endTime = new Date(to.toString());

    const garage = await prisma.parkingGarage.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!garage) {
      return { error: 'No garage found' };
    }
    let combinedRevenue = 0;

    if (isPermanentTenant === 'true') {
      combinedRevenue = await reportPermanentTenants(garage, startTime, endTime);
    } else {
      const revenue = await profitFromPeriod(garage, startTime, endTime);
      const estimatedRevenue = await getReportForGarage(garage.id);

      combinedRevenue = revenue + estimatedRevenue.estimatedRevenue;
    }

    await prisma.accountingReport.create({
      data: {
        parking_garage_id: garage.id,
        generationTime: new Date(),
        searchFrom: startTime,
        searchTo: endTime,
        price: combinedRevenue
      }
    });

    return {
      combinedRevenue
    };
  }
};

async function profitFromPeriod(
  garage: ParkingGarage,
  startTime: Date,
  endTime: Date
): Promise<number> {
  const tickets = await prisma.parkingTicket.findMany({
    where: {
      parking_garage_id: garage.id,
      exit_date: {
        gte: startTime,
        lte: endTime
      }
    }
  });

  const revenue = tickets.reduce((acc, ticket) => acc + ticket.finalprice!, 0);

  return revenue;
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
    }
  });

  console.log('customers', customers);
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
  for (const customer of customers) {
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
      console.log(current.toISODate());
      current = current.plus({ months: 1 });
    }
  }
  return revenue;
}
