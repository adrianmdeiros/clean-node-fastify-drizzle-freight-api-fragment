import { City } from "../entities/city";
import { Freight } from "../entities/freight";

export interface IFreightService {
    calculate(freight: { weight: number, cityTax: number }): number
    orderByValue(freights: Freight[]): Freight[]
    getHigherCost(freight: Freight[]): Freight
    getCityWithMostFreights(cities: City[]): City
}