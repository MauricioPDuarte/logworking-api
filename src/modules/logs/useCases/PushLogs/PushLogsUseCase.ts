import { LogRepository } from "@modules/logs/repositories/implementations/LogRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class PushLogsUseCase {
  constructor(
    @inject("LogRepository")
    private logRepository: LogRepository
  ) {}

  async execute(logs: LogDTO[], userId: number) : Promise<void> {
    logs.forEach(async (log) => {
        await this.logRepository.create({
            start: new Date(log.start),
            end: new Date(log.end),
            userId: userId,
        });
    })
    }
}

export { PushLogsUseCase }