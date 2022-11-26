import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CountUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute() : Promise<number> {
    return await this.usersRepository.count();
  }
}

export { CountUsersUseCase }