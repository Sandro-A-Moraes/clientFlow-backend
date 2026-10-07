import {
  type Employee,
  type PrismaClient,
} from '../../generated/prisma/client.js';

export class EmployeesRepository {
  private readonly prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async findByEmail(email: string): Promise<Employee | null> {
    return await this.prisma.employee.findUnique({
      where: {
        email: email,
      },
    });
  }
}
