import { describe, it, expect} from "vitest";
import { IFreightService } from "../../../domain/services/freights";
import { FreightService } from "./freights";
describe('Freight Service', () => {
    let service: IFreightService
    it('should correctly calculate freight value.', () => {
        
        const freightService = new FreightService()
        const freightValue = freightService.calculateFreight({ weight, fixValue, cityDeliveryFee })
        
        expect(freightValue).toBe()
    })
})