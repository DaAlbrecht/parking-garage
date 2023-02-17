import { prisma } from '$lib/server/database';
import { fail } from '@sveltejs/kit';

import type { Actions } from './$types';

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
	}
};
