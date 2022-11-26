import { Request, Response } from "express";
import { container } from "tsyringe";
import { CountUsersUseCase } from "./CountUsersUseCase";

class CountUsersController {
    async handle(request: Request, response: Response): Promise<Response> {
        const countUsersUseCase = container.resolve(CountUsersUseCase);

        const count = await countUsersUseCase.execute();

        return response.status(201).json({total: count});
    }
}

export { CountUsersController }