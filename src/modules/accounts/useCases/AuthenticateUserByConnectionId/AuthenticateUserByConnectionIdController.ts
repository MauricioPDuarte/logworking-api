import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserByConnectionIdUseCase } from "./AuthenticateUserByConnectionIdUseCase";

class AuthenticateUserByConnectionIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { connectionId } = request.body;

        const authenticateUserUseCase = container.resolve(AuthenticateUserByConnectionIdUseCase);

        const {user, token} = await authenticateUserUseCase.execute({
            connectionId,
        });

        return response.status(200).json({user, token});
    }
}

export { AuthenticateUserByConnectionIdController }