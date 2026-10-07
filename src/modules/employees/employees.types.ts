import type { Employee } from '../../generated/prisma/client.js';

export type PublicEmployee = Omit<Employee, 'passwordHash'>;
