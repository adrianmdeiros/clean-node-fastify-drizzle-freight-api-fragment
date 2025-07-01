import { CreateFreightResponse } from "../../presentation/http/dtos/output/create-freight-response";

export interface IFreightService {
    orderByValue(freights: CreateFreightResponse[]): CreateFreightResponse[]
}