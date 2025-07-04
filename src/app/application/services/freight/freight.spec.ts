import { beforeEach, describe, expect, it } from "vitest";
import { City } from "../../../domain/entities/city";
import { Client } from "../../../domain/entities/client";
import { Freight } from "../../../domain/entities/freight";
import { IFreightService } from "../../../domain/services/freights";
import { FreightService } from "./freights";

describe('Freight Service', () => {
    let service: IFreightService

    beforeEach(() => {
        service = new FreightService()
    })


    it('should correctly calculate freight value.', () => {
        const client = new Client('Adrian', 'Parque Athenas', '98955555555')
        const city = new City('São Luís', 'MA', 7.00)
        const freight = new Freight('Exemplo de descrição 1...', 5.00, client, city)

        const freightValue = service.calculate({
            weight: freight.weight,
            cityTax: city.tax
        })

        expect(freightValue).toBe(57)
    })

    it('should get higher cost freight.', () => {
        const client = new Client('Adrian', 'Parque Athenas', '98955555555')
        const city = new City('São Luís', 'MA', 2.00)

        const freight1 = new Freight('Exemplo de descrição 1...', 10, client, city)
        const freight2 = new Freight('Exemplo de descrição 2...', 5, client, city)
        const freight3 = new Freight('Exemplo de descrição 3...', 20, client, city)
        const freight4 = new Freight('Exemplo de descrição 4...', 30, client, city)

        freight1.value = service.calculate({ weight: freight1.weight, cityTax: city.tax })
        freight2.value = service.calculate({ weight: freight2.weight, cityTax: city.tax })
        freight3.value = service.calculate({ weight: freight3.weight, cityTax: city.tax })
        freight4.value = service.calculate({ weight: freight4.weight, cityTax: city.tax })

        const freightList = [
            freight1,
            freight2,
            freight3,
            freight4
        ]

        const higherCostFreight = service.getHigherCost(freightList)

        expect(higherCostFreight).toStrictEqual(freight4)
    })

    it('should return the city with largest amount of freight sent.', () => {
        const client = new Client('Adrian', 'Parque Athenas', '98955555555')
        const city1 = new City('São Luís', 'MA', 2.00)
        const city2 = new City('Fortaleza', 'CE', 5.00)
        
        const cities = [
            city1,
            city2
        ]

        const freight1 = new Freight('Exemplo de descrição 1...', 10, client, city1)
        const freight2 = new Freight('Exemplo de descrição 2...', 5, client, city1)
        const freight3 = new Freight('Exemplo de descrição 3...', 20, client, city1)
        const freight4 = new Freight('Exemplo de descrição 4...', 30, client, city2)
        const freight5 = new Freight('Exemplo de descrição 5...', 30, client, city2)

        city1.freights.push(freight1)
        city1.freights.push(freight2)
        city1.freights.push(freight3)

        city2.freights.push(freight4)
        city2.freights.push(freight5)

        const cityWithMostFreights = service.getCityWithMostFreights(cities) 

        expect(cityWithMostFreights).toBe(city1)
    })

})