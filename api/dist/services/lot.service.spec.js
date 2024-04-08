"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const lot_service_1 = require("./lot.service");
describe('LotService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [lot_service_1.LotService],
        }).compile();
        service = module.get(lot_service_1.LotService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=lot.service.spec.js.map