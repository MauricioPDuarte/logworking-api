import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { AppError } from "errors/AppError";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IRequest {
    connectionId: string | null;
}

interface IResponse {
    user: {
        email: string;
        name: string;
    },
    token: string;
}

@injectable()
class AuthenticateUserByConnectionIdUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) {}

    async execute({ connectionId }: IRequest): Promise<IResponse> {
        console.log(connectionId);
        
        if(!connectionId) {
            throw new AppError("User with connectionID not found", 404);
        }

        const user = await this.usersRepository.findByConnectionId(connectionId);

        console.log('id', connectionId);
        console.log('user:', user)

        if (user == null) {
            throw new AppError("User with connectionID not found", 404);
        }

        const token = sign({}, "705de1fd6c33bbca21dc91d55c452add", {
            subject: user.id.toString(),
            expiresIn: "1d",
        });

        console.log(token);

        return {
            user: {
                name: user.name!,
                email: user.email,
            },
            token,
        };
    }
}

export {AuthenticateUserByConnectionIdUseCase}