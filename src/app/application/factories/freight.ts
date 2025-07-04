import { Freight } from "../../domain/entities/freight";
import { IFactory } from "./interfaces/factory";

export class FreightFactory implements IFactory {
    create(validFreight: Omit<Freight, 'id'>): Freight {
        return new Freight(
            validFreight.description,
            validFreight.weight,
            validFreight.client,
            validFreight.city,
            validFreight.value
        )
    }
}