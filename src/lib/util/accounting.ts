import { prisma } from '$lib/server/database';
import { RateType, type ParkingTicket } from '@prisma/client';

export async function calculatePrice(parkingTicket: ParkingTicket) {
  const customer = await prisma.customer.findFirst({
    where: {
      id: parkingTicket.customer_id
    }
  });

  if (!customer) {
    throw new Error('No customer found for this parking ticket');
  }

  if (customer.is_long_term_customer) {
    return 0;
  }

  const rates = await prisma.parkingRate.findMany({
    where: {
      parking_garage_id: customer.parking_garage_id
    }
  });

  let isHoliday: boolean | null = null;
  const timeNow = new Date();

  const timeDifferenceInHours = Math.ceil(
    (Date.now() - parkingTicket.entry_date.getTime()) / 1000 / 60 / 60
  );

  const days = Math.floor(timeDifferenceInHours / 24);

  if (!rates) {
    throw new Error('No rates found for this parking garage');
  }

  const dayRate = rates.find((rate) => rate.rateType === RateType.DAYRATE);

  if (!dayRate) {
    throw new Error('No day rate found for this parking garage');
  }

  const matchingRatesHourSlots = rates.filter((element) => {
    let startTime = element.start_time.getHours();
    let endTime = element.end_time.getHours();

    if (endTime === 0) {
      endTime = 24;
    }

    return startTime <= timeNow.getHours() && endTime >= timeNow.getHours();
  });

  //https://date.nager.at/swagger/index.html
  const request = await fetch('https://date.nager.at/api/v3/IsTodayPublicHoliday/CH?offset=0', {
    method: 'GET',
    headers: {
      accept: '*/*'
    }
  });

  isHoliday = request.status === 200 ? true : request.status === 204 ? false : null;

  if (isHoliday) {
    const rate = matchingRatesHourSlots.filter((rate) => rate.rateType === 'HOLIDAY');
    return timeDifferenceInHours * rate[0].price + days * dayRate.price;
  }

  //weekdays
  if (timeNow.getDay() < 6) {
    const rate = matchingRatesHourSlots.filter((rate) => rate.rateType === 'WEEKDAY');
    return timeDifferenceInHours * rate[0].price + days * dayRate.price;
  }
  //weekends
  if (timeNow.getDay() >= 6) {
    const rate = matchingRatesHourSlots.filter((rate) => rate.rateType === 'WEEKEND');
    return timeDifferenceInHours * rate[0].price + days * dayRate.price;
  }
  return 0;
}
