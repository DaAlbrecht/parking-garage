import { prisma } from '$lib/server/database';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
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
    return {
      status: 200
    };
  },
  addLevel: async ({ request }) => {
    const data = await request.formData();
    const parkingGarageId = data.get('garageId');
    const capacity = data.get('parking_spaces');

    if (!parkingGarageId || !capacity) {
      return fail(422, { error: 'Missing data' });
    }

    const parkingGarageIdNumber = Number(parkingGarageId);
    const capacityNumber = Number(capacity);
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
          parking_spaces: capacityNumber,
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
