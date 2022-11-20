import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { syncRoutes } from "./sync.routes";

import { usersRoutes } from "./users.routes";

const routes = Router();

routes.use('/users', usersRoutes)
routes.use('/sync', syncRoutes)
routes.use(authenticateRoutes)

export { routes };