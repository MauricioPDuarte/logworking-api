import { User } from "@prisma/client";

interface ILogRepository {
    create(user: Log): Promise<void>;
}

export { ILogRepository }