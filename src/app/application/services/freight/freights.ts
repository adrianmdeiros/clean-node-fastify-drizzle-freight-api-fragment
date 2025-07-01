import { IFreightService } from "../../../domain/services/freights";
import { CreateFreightResponse } from "../../../presentation/http/dtos/output/create-freight-response";

export class FreightService implements IFreightService {
    orderByValue(freights: CreateFreightResponse[]): CreateFreightResponse[] {
        return freights.sort((a, b) => a.value - b.value)
    }
}