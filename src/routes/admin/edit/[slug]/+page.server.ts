import { prisma } from '$lib/server/database';
import type { PageServerLoad } from './$types';

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
