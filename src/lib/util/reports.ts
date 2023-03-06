import { prisma } from '$lib/server/database';
import type { Customer, Level, ParkingTicket } from '@prisma/client';
import { getOccupancyForLevel } from './parkingSpaceUtil';

interface Report {
    occupancy: number;
    estimatedRevenue: number;
}

export async function getReportForLevel(level: Level): Promise<Report> {
    const occupancy = await getOccupancyForLevel(level);
    let estimatedRevenue = 0;
    const parkingSpaces = await prisma.parkingSpace.findMany({
		where: {
			level_id: level.id
		}		
	});

    for(const parkingSpace of parkingSpaces) {
        const parkingTicket = await prisma.parkingTicket.findFirst({
            where: {
                customer_id: parkingSpace.customer_id
            }
        });
        if(!parkingTicket) continue;

        const Customer = await prisma.customer.findFirst({
            where: {
                id: parkingTicket.customer_id
            }
        });

        if(!Customer) continue;

        estimatedRevenue += await calculateEstimatedForParkingTicket(parkingTicket, Customer, level.parking_garage_id);
    }
    
    console.log(parkingSpaces);
    return{
        occupancy: occupancy,
        estimatedRevenue: estimatedRevenue
    }   
}

///TODO: implement
// async function getReportForTimePeriod(parkingSpace: ParkingSpace, startTime: Date , endTime: Date ): Promise<Report> {

// }

async function calculateEstimatedForParkingTicket(parkingTicket: ParkingTicket, customer: Customer, garageId :number): Promise<number> {
  
   if(customer.is_long_term_customer) return 0;

   //always round up
    const timeDifferenceInHours = Math.ceil((Date.now() - parkingTicket.entry_date.getTime() ) / 1000 / 60 / 60);

    ///TODO: implement different rates
    // const rates = await prisma.parkingRate.findFirst({
    //     where: {
    //         parking_garage_id: garageId
    //     }
    // });
    // if(!rates) return 0;

    const rate = 5;

    return timeDifferenceInHours * rate;
}

///TODO: implement rates and cap at daily rate
// function calculateRates(){

// }