import { LogRepository } from "@modules/logs/repositories/implementations/LogRepository";
import { differenceInDays, differenceInHours, differenceInMinutes, intervalToDuration, format } from "date-fns";
import { inject, injectable } from "tsyringe";

@injectable()
class ListLogsUseCase {
    constructor(
        @inject("LogRepository")
        private logRepository: LogRepository
      ) {}

    async execute(user_id: number | null) {

        var list = [];
        if(user_id) {
            list = await this.logRepository.listByUser(user_id);
        } else {
            list = await this.logRepository.listAll();
        }  

        return list.map((e) =>  { 
            const log: LogListDTO = {  
                id: e.id,
                name: e.user.name, 
                start: format(e.start, "d/MM/yyyy hh:mm:ss"),
                end: format(e.end, "dd/MM/yyyy hh:mm:ss"),
                totalMinutes: intervalToDuration({start: e.start, end: e.end}).minutes,
                totalHours: intervalToDuration({start: e.start, end: e.end}).hours, 
                totalDays: intervalToDuration({start: e.start, end: e.end}).days,
            };
            return log;
        });
    }
}

export { ListLogsUseCase }


