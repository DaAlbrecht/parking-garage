import { prisma } from '$lib/server/database';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	deleteLevel: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		if (!id) return fail(422, { error: 'Missing id' });

		const idNumber = Number(id);

		try {
			await prisma.level.delete({
				where: {
					id: idNumber
				}
			});
		} catch (error) {
			return fail(422, { error: 'Level does not exist' });
		}
		return {
			status: 200
		};
	}
};

export const load = (async ({ params }) => {
	const garage = await prisma.parkingGarage.findUnique({
		where: {
			id: Number(params.slug)
		}
	});
	const levels = await prisma.level.findMany({
		where: {
			parking_garage_id: Number(params.slug)
		}
	});
	return { garage: garage, levels: levels };
}) satisfies PageServerLoad;
