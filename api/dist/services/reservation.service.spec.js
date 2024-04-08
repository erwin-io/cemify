"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const reservation_service_1 = require("./reservation.service");
describe('ReservationService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [reservation_service_1.ReservationService],
        }).compile();
        service = module.get(reservation_service_1.ReservationService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=reservation.service.spec.js.map