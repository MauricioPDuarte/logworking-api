import { User } from "@prisma/client";
import { UserDTO } from "../dtos/UserDTO";

interface IUsersRepository {
    create(user: UserDTO): Promise<void>;
    findById(userId: number): Promise<User | null>;
    findByEmail(userEmail: string): Promise<User | null>;
    findByConnectionId(connectionId: string): Promise<User | null>;
}

export { IUsersRepository }