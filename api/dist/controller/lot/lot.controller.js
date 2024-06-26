"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const lot_update_dto_1 = require("../../core/dto/lot/lot.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const lot_service_1 = require("../../services/lot.service");
let LotController = class LotController {
    constructor(lotService) {
        this.lotService = lotService;
    }
    async getByCode(lotCode) {
        const res = {};
        try {
            res.data = await this.lotService.getByCode(lotCode);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getByBlock(block) {
        const res = {};
        try {
            res.data = await this.lotService.getByBlock(block);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getPaginated(params) {
        const res = {};
        try {
            res.data = await this.lotService.getPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async updateStatus(lotCode, dto) {
        const res = {};
        try {
            res.data = await this.lotService.updateStatus(lotCode, dto);
            res.success = true;
            res.message = `Lot status ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async updateMapData(lotCode, body) {
        const res = {};
        try {
            res.data = await this.lotService.updateMapData(lotCode, body);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
};
__decorate([
    (0, common_1.Get)("/:lotCode"),
    __param(0, (0, common_1.Param)("lotCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "getByCode", null);
__decorate([
    (0, common_1.Get)("getByBlock/:block"),
    __param(0, (0, common_1.Param)("block")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "getByBlock", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Put)("/updateStatus/:lotCode"),
    __param(0, (0, common_1.Param)("lotCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, lot_update_dto_1.UpdateLotStatusDto]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Put)("/updateMapData/:lotCode"),
    __param(0, (0, common_1.Param)("lotCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, lot_update_dto_1.UpdateLotMapDataDto]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "updateMapData", null);
LotController = __decorate([
    (0, swagger_1.ApiTags)("lot"),
    (0, common_1.Controller)("lot"),
    __metadata("design:paramtypes", [lot_service_1.LotService])
], LotController);
exports.LotController = LotController;
//# sourceMappingURL=lot.controller.js.map