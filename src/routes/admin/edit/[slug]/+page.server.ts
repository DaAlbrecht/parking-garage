import { prisma } from '$lib/server/database';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  updateGarage: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    const name = data.get('name');
    const address = data.get('address');

    if (!id) return fail(422, { error: 'Missing id' });

    const idNumber = Number(id);

    try {
      await prisma.parkingGarage.update({
        where: {
          id: idNumber
        },
        data: {
          name: name?.toString(),
          address: address?.toString()
        }
      });
    } catch (error) {
      return fail(422, { error: 'Garage does not exist' });
    }
    return {
      status: 200
    };
  },
  deleteGarage: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');

    if (!id) return fail(422, { error: 'Missing id' });

    const idNumber = Number(id);

    try {
      await prisma.parkingGarage.delete({
        where: {
          id: idNumber
        }
      });
    } catch (error) {
      return fail(422, { error: 'Garage does not exist' });
    }
    throw redirect(303, '/admin');
  },
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
  },
  addLevel: async ({ request }) => {
    const data = await request.formData();
    const parkingGarageId = data.get('garageId');
    if (!parkingGarageId) {
      return fail(422, { error: 'Missing data' });
    }

    const parkingGarageIdNumber = Number(parkingGarageId);
    const highestLevel = await prisma.level.findFirst({
      where: {
        parking_garage_id: parkingGarageIdNumber
      },
      orderBy: {
        levelNumber: 'desc'
      }
    });
    try {
      await prisma.level.create({
        data: {
          levelNumber: highestLevel ? highestLevel.levelNumber + 1 : 1,
          parking_spaces: 10,
          parking_garage_id: parkingGarageIdNumber
        }
      });
    } catch (error) {
      return fail(422, { error: 'Level already exists' });
    }
    return {
      status: 200
    };
  },
  parkingSpaces: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    const parkingSpaces = data.get('parking_spaces');

    if (!id || !parkingSpaces) return fail(422, { error: 'Missing data' });

    try {
      await prisma.level.update({
        where: {
          id: Number(id)
        },
        data: {
          parking_spaces: Number(parkingSpaces)
        }
      });
    } catch (error) {
      return fail(422, { error: 'Level does not exist' });
    }
    return {
      status: 200
    };
  }
} satisfies Actions;

export const load = (async ({ params }) => {
  const garage = await prisma.parkingGarage.findUnique({
    where: {
      id: Number(params.slug)
    },
    include: {
      levels: true,
      parkingRates: true
    }
  });
  return { garage: garage };
}) satisfies PageServerLoad;
