import { City } from "../../domain/entities/city";
import { IFactory } from "./interfaces/factory";

export class CityFactory implements IFactory {
    create(validCity: Omit<City, 'id' | 'freights'>): City {
        return new City(
            validCity.name,
            validCity.uf,
            validCity.tax
        )
    }
}