import { PushLogsController } from "@modules/sync/useCases/PushLogs/PushLogsController";
import { Router } from "express";
import { ensureAuthenticated } from "middlewares/ensureAuthenticated";

const pushLogsController = new PushLogsController();

const syncRoutes = Router();

syncRoutes.use(ensureAuthenticated);

syncRoutes.post('/push', pushLogsController.handle)

export { syncRoutes };