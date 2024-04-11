"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const work_order_service_1 = require("./work-order.service");
describe('WorkOrderService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [work_order_service_1.WorkOrderService],
        }).compile();
        service = module.get(work_order_service_1.WorkOrderService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=work-order.service.spec.js.map