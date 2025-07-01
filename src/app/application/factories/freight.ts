import { Freight } from "../../domain/entities/freight";
import { IFactory } from "./interfaces/factory";

export class FreightFactory implements IFactory {
    create(validFreight: Freight): Freight {
        return new Freight(
            validFreight.description,
            validFreight.weight,
            validFreight.value,
            validFreight.client,
            validFreight.city
        )
    }
}