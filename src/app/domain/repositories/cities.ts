import { CreateCityResponse } from "../../presentation/http/dtos/output/create-city-response";
import { City } from "../entities/city";

export interface ICitiesRepository {
    save(city: City): Promise<CreateCityResponse>
    findById(cityId: string): Promise<CreateCityResponse>
    findByName(name: string): Promise<CreateCityResponse>
}