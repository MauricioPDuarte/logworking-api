import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { AppError } from "errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    const authHeader = request.headers.authorization;

    console.log(authHeader);

    if(!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const {sub: user_id } = verify(token, "705de1fd6c33bbca21dc91d55c452add") as IPayload;
        
        console.log('Aqui:', user_id);

       const usersRepository = new UsersRepository();
       const user = await usersRepository.findById(parseInt(user_id));

       console.log(user);

       if (!user) {
          throw new AppError("User does not exists!", 401);
        }

        request.user = {
            id: parseInt(user_id),
        }

        next();

    }catch(e) {
        console.log(e)
        throw new AppError("Invalid token", 401);
    }
}