import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { compareSync } from "bcrypt";
import { AppError } from "errors/AppError";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if(user == null) {
            throw new AppError('Email or password incorrect');
        }

        const passwordMatch = await compareSync(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect");
        }

        const token = sign({}, "705de1fd6c33bbca21dc91d55c452add", {
            subject: user.id.toString(),
            expiresIn: "1d",
        });

        return {
            user: {
                name: user.name!,
                email: user.email,
            },
            token,
        };
    }
}

export {AuthenticateUserUseCase}