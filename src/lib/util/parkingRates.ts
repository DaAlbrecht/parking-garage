import type { ParkingRate } from '@prisma/client';

export const getInitialParkingRatesForGarage: (garageId: number) => Omit<ParkingRate, 'id'>[] = (
  garageId
) => [
  {
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-04T00:00:00.000Z'),
    end_time: new Date('2021-01-04T05:59:00.000Z'),
    rateType: 'WEEKDAY'
  },
  {
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-04T06:00:00.000Z'),
    end_time: new Date('2021-01-04T08:59:00.000Z'),
    rateType: 'WEEKDAY'
  },
  {
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-04T09:00:00.000Z'),
    end_time: new Date('2021-01-04T17:59:00.000Z'),
    rateType: 'WEEKDAY'
  },
  {
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-04T18:00:00.000Z'),
    end_time: new Date('2021-01-04T20:59:00.000Z'),
    rateType: 'WEEKDAY'
  },
  {
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-04T21:00:00.000Z'),
    end_time: new Date('2021-01-04T23:59:00.000Z'),
    rateType: 'WEEKDAY'
  },
  {
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-09T00:00:00.000Z'),
    end_time: new Date('2021-01-09T08:59:00.000Z'),
    rateType: 'WEEKEND'
  },
  {
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-09T09:00:00.000Z'),
    end_time: new Date('2021-01-09T17:59:00.000Z'),
    rateType: 'WEEKEND'
  },
  {
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-09T18:00:00.000Z'),
    end_time: new Date('2021-01-09T23:59:00.000Z'),
    rateType: 'WEEKEND'
  },
  {
    price: 3.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-12-24T00:00:00.000Z'),
    end_time: new Date('2021-12-25T23:59:00.000Z'),
    rateType: 'HOLIDAY'
  },
  {
    price: 40,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-04T00:00:00.000Z'),
    end_time: new Date('2021-01-04T23:59:00.000Z'),
    rateType: 'DAYRATE'
  },
  {
    price: 400,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-04T00:00:00.000Z'),
    end_time: new Date('2021-01-04T23:59:00.000Z'),
    rateType: 'MONTHRATE'
  }
];
