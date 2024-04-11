"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const work_order_controller_1 = require("./work-order.controller");
describe("WorkOrderController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [work_order_controller_1.WorkOrderController],
        }).compile();
        controller = module.get(work_order_controller_1.WorkOrderController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=work-order.controller.spec.js.map