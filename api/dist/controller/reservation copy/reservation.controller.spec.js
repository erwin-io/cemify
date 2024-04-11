"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const reservation_controller_1 = require("./reservation.controller");
describe("ReservationController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [reservation_controller_1.ReservationController],
        }).compile();
        controller = module.get(reservation_controller_1.ReservationController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=reservation.controller.spec.js.map