import { prisma } from '$lib/server/database';
import type { ParkingTicket } from '@prisma/client';

export async function calculatePrice(parkingTicket: ParkingTicket) {
  const rates = await prisma.parkingRate.findMany({
    where: {
      parking_garage_id: parkingTicket.parking_garage_id
    }
  });

  const maxHoursBeforeFlatRate = 24;
  const timeNow = new Date();

  ///TODO: fix timezones UTC -> UTC+1
  const matchingRatesHourSlots = rates.filter((element) => {
    let startTime = element.start_time.getHours();
    let endTime = element.end_time.getHours();

    if (endTime === 0) {
      endTime = 24;
    }

    return startTime <= timeNow.getHours() && endTime >= timeNow.getHours();
  });

  let isHoliday: boolean | null = null;

  //https://date.nager.at/swagger/index.html

  //   const request = await fetch('https://date.nager.at/api/v3/IsTodayPublicHoliday/CH?offset=0', {
  //     method: 'GET',
  //     headers: {
  //       accept: '*/*'
  //     }
  //   });

  //   const data = await request.json();

  //   isHoliday = data.status === 200 ? true : data.status === 204 ? false : null;

  isHoliday = false;

  const timeDifferenceInHours = Math.ceil(
    (Date.now() - parkingTicket.entry_date.getTime()) / 1000 / 60 / 60
  );

  if (timeDifferenceInHours < 24) {
    if (isHoliday) {
      const rate = matchingRatesHourSlots.filter((rate) => rate.rateType === 'HOLIDAY');
      return timeDifferenceInHours * rate[0].price;
    }

    //weekdays
    if (timeNow.getDay() < 6) {
      const rate = matchingRatesHourSlots.filter((rate) => rate.rateType === 'WEEKDAY');
      return timeDifferenceInHours * rate[0].price;
    }
    //weekends
    if (timeNow.getDay() >= 6) {
      const rate = matchingRatesHourSlots.filter((rate) => rate.rateType === 'WEEKEND');
      return timeDifferenceInHours * rate[0].price;
    }
  }
}
