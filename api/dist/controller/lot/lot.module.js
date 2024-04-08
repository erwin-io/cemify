"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotModule = void 0;
const common_1 = require("@nestjs/common");
const lot_controller_1 = require("./lot.controller");
const Lot_1 = require("../../db/entities/Lot");
const lot_service_1 = require("../../services/lot.service");
const typeorm_1 = require("@nestjs/typeorm");
let LotModule = class LotModule {
};
LotModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Lot_1.Lot])],
        controllers: [lot_controller_1.LotController],
        providers: [lot_service_1.LotService],
        exports: [lot_service_1.LotService],
    })
], LotModule);
exports.LotModule = LotModule;
//# sourceMappingURL=lot.module.js.map