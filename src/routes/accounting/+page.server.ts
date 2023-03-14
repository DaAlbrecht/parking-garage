import { prisma } from '$lib/server/database';
import { getReportForGarage, type Report } from '$lib/util/reports';
import type { ParkingGarage } from '@prisma/client';

export const actions = {
  generateReport: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    const from = data.get('from');
    const to = data.get('to');

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

    const exitTicketRevenue = await exitTicketProfitFromPeriod(garage, startTime, endTime);
    const estimatedRevenue = await getReportForGarage(garage.id);

    const combinedRevenue = exitTicketRevenue + estimatedRevenue.estimatedRevenue;

    const customers = await prisma.customer.findMany({
      where: {
        parking_garage_id: garage.id,
        is_long_term_customer: true,
        is_blocked: false
      }
    });

    // filter for customers that got blocked but paid during the period

    console.log(customers.length);

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

async function exitTicketProfitFromPeriod(
  garage: ParkingGarage,
  startTime: Date,
  endTime: Date
): Promise<number> {
  const tickets = await prisma.exitTicket.findMany({
    where: {
      parking_garage_id: garage.id,
      exit_date: {
        gte: startTime,
        lte: endTime
      }
    }
  });

  const revenue = tickets.reduce((acc, ticket) => acc + ticket.price, 0);

  return revenue;
}

//create logic that keeps track of the occupancy of the garage
