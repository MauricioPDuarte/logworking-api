import { UserDTO } from "@modules/accounts/dtos/UserDTO";
import { Prisma, PrismaClient, User } from "@prisma/client";
import { ILogRepository } from "../ILogRepository";

const prisma = new PrismaClient()

class LogRepository implements ILogRepository {
    async create(log: Log): Promise<void> {
       await prisma.log.create({data: {
        start: log.start,
        end: log.end,
        user_id: log.userId,
       }});
    }

    async listByUser(user_id: number) {
        return await prisma.log.findMany({ where: {
            user_id: user_id
        }, include: {user: true}})
    }

    async listAll() {
        return await prisma.log.findMany({ include: {user: true} });
    }


}

export { LogRepository }