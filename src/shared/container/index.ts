import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ILogRepository } from "@modules/logs/repositories/ILogRepository";
import { LogRepository } from "@modules/logs/repositories/implementations/LogRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<ILogRepository>(
    "LogRepository",
    LogRepository
);