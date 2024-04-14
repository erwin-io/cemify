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
exports.BurialController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const burial_create_dto_1 = require("../../core/dto/burial/burial.create.dto");
const burial_update_dto_1 = require("../../core/dto/burial/burial.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const burial_service_1 = require("../../services/burial.service");
let BurialController = class BurialController {
    constructor(burialService) {
        this.burialService = burialService;
    }
    async searcMap(key) {
        const res = {};
        try {
            res.data = await this.burialService.searchMap(key);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getAllByClientUserCode(userCode) {
        const res = {};
        try {
            res.data = await this.burialService.getAllByClientUserCode(userCode);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async generateReport() {
        const res = {};
        try {
            res.data = await this.burialService.getAll();
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getDetails(burialCode) {
        const res = {};
        try {
            res.data = await this.burialService.getByCode(burialCode);
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
            res.data = await this.burialService.getPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(dto) {
        const res = {};
        try {
            res.data = await this.burialService.create(dto);
            res.success = true;
            res.message = `Burial ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async createFromReservation(dto) {
        const res = {};
        try {
            res.data = await this.burialService.createFromReservation(dto);
            res.success = true;
            res.message = `Burial ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async update(burialCode, dto) {
        const res = {};
        try {
            res.data = await this.burialService.update(burialCode, dto);
            res.success = true;
            res.message = `Burial ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async delete(burialCode) {
        const res = {};
        try {
            res.data = await this.burialService.delete(burialCode);
            res.success = true;
            res.message = `Burial ${api_response_constant_1.DELETE_SUCCESS}`;
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
    (0, common_1.Get)("/searchMap/:key"),
    __param(0, (0, common_1.Param)("key")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BurialController.prototype, "searcMap", null);
__decorate([
    (0, common_1.Get)("/getAllByClientUserCode/:userCode"),
    __param(0, (0, common_1.Param)("userCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BurialController.prototype, "getAllByClientUserCode", null);
__decorate([
    (0, common_1.Get)("/generateReport"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BurialController.prototype, "generateReport", null);
__decorate([
    (0, common_1.Get)("/:burialCode"),
    __param(0, (0, common_1.Param)("burialCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BurialController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], BurialController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [burial_create_dto_1.CreateBurialDto]),
    __metadata("design:returntype", Promise)
], BurialController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("/createFromReservation"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [burial_create_dto_1.CreateBurialFromReservationDto]),
    __metadata("design:returntype", Promise)
], BurialController.prototype, "createFromReservation", null);
__decorate([
    (0, common_1.Put)("/:burialCode"),
    __param(0, (0, common_1.Param)("burialCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, burial_update_dto_1.UpdateBurialDto]),
    __metadata("design:returntype", Promise)
], BurialController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("/:burialCode"),
    __param(0, (0, common_1.Param)("burialCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BurialController.prototype, "delete", null);
BurialController = __decorate([
    (0, swagger_1.ApiTags)("burial"),
    (0, common_1.Controller)("burial"),
    __metadata("design:paramtypes", [burial_service_1.BurialService])
], BurialController);
exports.BurialController = BurialController;
//# sourceMappingURL=burial.controller.js.map