import { AuthenticateUserController } from "@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";
import { AuthenticateUserByConnectionIdController } from "@modules/accounts/useCases/AuthenticateUserByConnectionId/AuthenticateUserByConnectionIdController";
import { Router } from "express";


const authenticateUserController = new AuthenticateUserController();
const authenticateUserByConnectionIdController = new AuthenticateUserByConnectionIdController();

const authenticateRoutes = Router();

authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/sessionn_connection_id", authenticateUserByConnectionIdController.handle);

export { authenticateRoutes };
