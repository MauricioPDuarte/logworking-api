import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { logsRoutes } from "./logs.routes";

import { usersRoutes } from "./users.routes";

const routes = Router();

routes.use('/users', usersRoutes)
routes.use('/logs', logsRoutes)
routes.use(authenticateRoutes)

export { routes };