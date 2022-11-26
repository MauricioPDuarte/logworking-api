import { ListLogsController } from "@modules/logs/useCases/ListLogs/ListLogsController";
import { PushLogsController } from "@modules/logs/useCases/PushLogs/PushLogsController";
import { Router } from "express";
import { ensureAuthenticated } from "middlewares/ensureAuthenticated";

const pushLogsController = new PushLogsController();
const listLogsController = new ListLogsController();

const logsRoutes = Router();



logsRoutes.use(ensureAuthenticated);

logsRoutes.post('/push', pushLogsController.handle)
logsRoutes.get('/', listLogsController.handle)


export { logsRoutes };