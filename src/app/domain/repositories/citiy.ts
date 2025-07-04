import { City } from "../entities/city";

export interface ICityRepository {
    save(city: City): Promise<City>
    findById(cityId: string): Promise<City>
    findByName(name: string): Promise<City>
}