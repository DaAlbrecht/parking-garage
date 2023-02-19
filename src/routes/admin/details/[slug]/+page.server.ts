import { prisma } from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const levels = await prisma.level.findMany({
		where: {
			parking_garage_id: Number(params.slug)
		}
	});
	return { levels: levels };
}) satisfies PageServerLoad;
