import { prisma } from '$lib/server/database';
import { fail } from '@sveltejs/kit';
import { findEmptyParkingSpace } from '$lib/util/findEmptyParkingSpace';
import type { Actions, PageServerLoad } from './$types';

export const actions: Actions = {
	longTermCustomer: async ({ request }) => {
		const data = await request.formData();

		const id = data.get('id');
		if (!id) return fail(422, { error: 'Missing id' });
		const idNumber = Number(id);
		const customer = await prisma.customer.findFirst({
			where: {
				id: idNumber,
				is_long_term_customer: true
			}
		});
		return { status: 200, customer: customer };
	},
	getParkingSpot: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		console.log(id);
		if (!id) return fail(422, { error: 'Missing id' });
		const idNumber = Number(id);
		const garage = await prisma.parkingGarage.findUnique({
			where: {
				id: idNumber
			}
		});
		if (!garage) return fail(422, { error: 'Garage does not exist' });
		findEmptyParkingSpace(garage);
	}
};

export const load = (async () => {
	const garages = await prisma.parkingGarage.findMany();
	return { garages: garages };
}) satisfies PageServerLoad;
