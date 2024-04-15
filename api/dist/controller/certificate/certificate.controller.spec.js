"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const certificate_controller_1 = require("./certificate.controller");
describe("CertificateController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [certificate_controller_1.CertificateController],
        }).compile();
        controller = module.get(certificate_controller_1.CertificateController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=certificate.controller.spec.js.map