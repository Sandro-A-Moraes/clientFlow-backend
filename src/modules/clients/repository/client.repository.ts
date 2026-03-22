import {prisma} from '../../../lib/prisma';

export class ClientRepository {
  async create(data: {
    userId: string;
    name: string;
    email: string;
    phone: string;
    observations?: string;
  }) {
    return await prisma.client.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true
      },

    });
  }

  async findManyByUserId(userId: string) {
    return await prisma.client.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}