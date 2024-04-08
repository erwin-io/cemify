"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const lot_controller_1 = require("./lot.controller");
describe("LotController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [lot_controller_1.LotController],
        }).compile();
        controller = module.get(lot_controller_1.LotController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=lot.controller.spec.js.map