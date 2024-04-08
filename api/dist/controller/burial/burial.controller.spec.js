"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const burial_controller_1 = require("./burial.controller");
describe("BurialController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [burial_controller_1.BurialController],
        }).compile();
        controller = module.get(burial_controller_1.BurialController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=burial.controller.spec.js.map