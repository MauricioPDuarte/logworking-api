import { AppError } from "errors/AppError";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import { routes } from "routes";

import "./shared/container";

const app = express();

app.use(express.json());

app.use(routes);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
                status_code: err.statusCode,
            });
        }

        return response.status(500).json({
            status_code: 500,
            message: `Internal server error - ${err.message}`,
        });
    }
);

app.listen(3333, () => console.log("Server is running! 🎉"));