import { Request, Response } from "express";

class PushLogsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { logs } = request.body;

        console.log(logs);

        return response.status(200);
    }
}

export { PushLogsController }