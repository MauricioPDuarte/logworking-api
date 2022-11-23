import { UserDTO } from "@modules/accounts/dtos/UserDTO";
import { PrismaClient, User } from "@prisma/client";
import { IUsersRepository } from "../IUsersRepository";

const prisma = new PrismaClient()

class UsersRepository implements IUsersRepository {
    async findByConnectionId(connectionId: string): Promise<User | null> {
        const findUser = await prisma.user.findFirst({ where: { connection_id: connectionId } });

        console.log('connectionId', connectionId);
        console.log('findUser:', findUser);

        return findUser;
    }
   
    async create(user: UserDTO): Promise<void> {
       await prisma.user.create({data: {
        name: user.name,
        email: user.email,
        password: user.password,
        connection_id: user.connection_id!
       }})
    }

    async findById(userId: number): Promise<User | null> {
        const findUser = await prisma.user.findFirst({ where: { id: userId } });

        return findUser;
    }

    async findByEmail(userEmail: string): Promise<User | null> {
        const findUser = await prisma.user.findFirst({ where: { email: userEmail } });

        return findUser;
    }
    
}

export { UsersRepository }