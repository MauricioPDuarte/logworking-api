import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListLogsUseCase } from "./ListLogsUseCase";

class ListLogsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const userId = request.query.userId as string;

        const listLogsUsecase = container.resolve(ListLogsUseCase);
        
        var result = await listLogsUsecase.execute(parseInt(userId) || null);
    
        return response.status(200).json(result);
    }
}   

export {ListLogsController}