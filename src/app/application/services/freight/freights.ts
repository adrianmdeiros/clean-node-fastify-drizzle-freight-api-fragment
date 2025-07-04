import { City } from "../../../domain/entities/city";
import { Freight } from "../../../domain/entities/freight";
import { IFreightService } from "../../../domain/services/freights";

export class FreightService implements IFreightService {

    calculate(freight: { weight: number, cityTax: number }): number {
        const FIX_VALUE = 10.0
        const freightTotal = freight.weight * FIX_VALUE + freight.cityTax
        return freightTotal
    }

    orderByValue(freights: Freight[]): Freight[] {
        const freightsOrderedByValue = freights.sort((a, b) => a.value - b.value)
        return freightsOrderedByValue
    }

    getHigherCost(freights: Freight[]): Freight {
        const higherCostFreight = freights.reduce((prev, current) => {
            return current.value > prev.value ? current : prev
        })
        return higherCostFreight
    }

    getCityWithMostFreights(cities: City[]): City {
        const cityWithMostFreights = cities.reduce((prev, current) => {
            return current.freights.length > prev.freights.length ? current : prev
        })

        return cityWithMostFreights
    }

}