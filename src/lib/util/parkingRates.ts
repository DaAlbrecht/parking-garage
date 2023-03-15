import type { ParkingRate } from '@prisma/client';
import { RateType } from '@prisma/client';

export const getInitialParkingRatesForGarage: (garageId: number) => Omit<ParkingRate, 'id'>[] = (
  garageId
) => [
  {
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-02T00:00:00.000Z'),
    end_time: new Date('2021-01-02T05:59:00.000Z'),
    rateType: 'WEEKDAY'
  },
  {
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-02T06:00:00.000Z'),
    end_time: new Date('2021-01-02T08:59:00.000Z'),
    rateType: 'WEEKDAY'
  },
  {
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-02T09:00:00.000Z'),
    end_time: new Date('2021-01-02T17:59:00.000Z'),
    rateType: 'WEEKDAY'
  },
  {
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-02T18:00:00.000Z'),
    end_time: new Date('2021-01-02T20:59:00.000Z'),
    rateType: 'WEEKDAY'
  },
  {
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-02T21:00:00.000Z'),
    end_time: new Date('2021-01-02T23:59:00.000Z'),
    rateType: 'WEEKDAY'
  },
  {
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-08T00:00:00.000Z'),
    end_time: new Date('2021-01-08T08:59:00.000Z'),
    rateType: 'WEEKEND'
  },
  {
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-08T09:00:00.000Z'),
    end_time: new Date('2021-01-08T17:59:00.000Z'),
    rateType: 'WEEKEND'
  },
  {
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-08T18:00:00.000Z'),
    end_time: new Date('2021-01-08T23:59:00.000Z'),
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
    start_time: new Date('2021-01-02T00:00:00.000Z'),
    end_time: new Date('2021-01-02T23:59:00.000Z'),
    rateType: 'DAYRATE'
  },
  {
    price: 400,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-02T00:00:00.000Z'),
    end_time: new Date('2021-01-02T23:59:00.000Z'),
    rateType: 'MONTHRATE'
  }
];
