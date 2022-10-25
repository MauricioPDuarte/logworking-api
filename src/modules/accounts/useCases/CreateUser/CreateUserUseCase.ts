import { UserDTO } from "@modules/accounts/dtos/UserDTO";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { hashSync } from "bcrypt";
import { randomUUID } from "crypto";
import { AppError } from "errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute(user: UserDTO) : Promise<void> {
    const findUserByEmail = await this.usersRepository.findByEmail(user.email);

    if(findUserByEmail != null) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hashSync(user.password, 8);
    const connectionId = randomUUID();

    await this.usersRepository.create({
      name: user.name,
      email: user.email,
      password: passwordHash,
      connection_id: connectionId
  });
  }
}

export { CreateUserUseCase }