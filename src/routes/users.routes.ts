import { CountUsersController } from "@modules/accounts/useCases/CountUsers/CountUsersController";
import { CreateUserController } from "@modules/accounts/useCases/CreateUser/CreateUserController";
import { Router } from "express";

const createUserController = new CreateUserController();
const countUsersController = new CountUsersController();

const usersRoutes = Router();


usersRoutes.post('/', createUserController.handle)
usersRoutes.get('/count', countUsersController.handle)

export { usersRoutes };