import { UserDTO } from "@modules/accounts/dtos/UserDTO";
import { PrismaClient, User } from "@prisma/client";
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
}

export { LogRepository }