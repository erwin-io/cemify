"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const burial_service_1 = require("./burial.service");
describe("BurialService", () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [burial_service_1.BurialService],
        }).compile();
        service = module.get(burial_service_1.BurialService);
    });
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=burial.service.spec.js.map