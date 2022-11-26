import { Request, Response } from "express";
import { container } from "tsyringe";
import { PushLogsUseCase } from "./PushLogsUseCase";

class PushLogsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { logs } = request.body;

        const pushLogsUseCase = container.resolve(PushLogsUseCase);
        
        await pushLogsUseCase.execute(logs, request.user.id);
        
        return response.status(200).json();
    }
}

export { PushLogsController }