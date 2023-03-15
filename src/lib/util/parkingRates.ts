import type { ParkingRate } from '@prisma/client';
import { RateType } from '@prisma/client';

export const getInitialParkingRatesForGarage: (garageId: number) => ParkingRate[] = (garageId) => [
  {
    id: 1,
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-02T00:00:00.000Z'),
    end_time: new Date('2021-01-02T05:59:00.000Z'),
    rateType: RateType.WEEKDAY
  },
  {
    id: 2,
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-02T06:00:00.000Z'),
    end_time: new Date('2021-01-02T08:59:00.000Z'),
    rateType: RateType.WEEKDAY
  },
  {
    id: 3,
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-02T09:00:00.000Z'),
    end_time: new Date('2021-01-02T17:59:00.000Z'),
    rateType: RateType.WEEKDAY
  },
  {
    id: 4,
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-02T18:00:00.000Z'),
    end_time: new Date('2021-01-02T20:59:00.000Z'),
    rateType: RateType.WEEKDAY
  },
  {
    id: 5,
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-02T21:00:00.000Z'),
    end_time: new Date('2021-01-02T23:59:00.000Z'),
    rateType: RateType.WEEKDAY
  },
  {
    id: 6,
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-08T00:00:00.000Z'),
    end_time: new Date('2021-01-08T08:59:00.000Z'),
    rateType: RateType.WEEKEND
  },
  {
    id: 7,
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-08T09:00:00.000Z'),
    end_time: new Date('2021-01-08T17:59:00.000Z'),
    rateType: RateType.WEEKEND
  },
  {
    id: 8,
    price: 1.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-08T18:00:00.000Z'),
    end_time: new Date('2021-01-08T23:59:00.000Z'),
    rateType: RateType.WEEKEND
  },
  {
    id: 9,
    price: 3.5,
    parking_garage_id: garageId,
    start_time: new Date('2021-12-24T00:00:00.000Z'),
    end_time: new Date('2021-12-25T23:59:00.000Z'),
    rateType: RateType.HOLIDAY
  },
  {
    id: 10,
    price: 40,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-02T00:00:00.000Z'),
    end_time: new Date('2021-01-02T23:59:00.000Z'),
    rateType: RateType.DAYRATE
  },
  {
    id: 10,
    price: 400,
    parking_garage_id: garageId,
    start_time: new Date('2021-01-02T00:00:00.000Z'),
    end_time: new Date('2021-01-02T23:59:00.000Z'),
    rateType: RateType.MONThRATE
  }
];
