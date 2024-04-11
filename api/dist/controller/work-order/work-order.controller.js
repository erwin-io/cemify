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
exports.WorkOrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const work_order_create_dto_1 = require("../../core/dto/work-order/work-order.create.dto");
const work_order_update_dto_1 = require("../../core/dto/work-order/work-order.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const work_order_service_1 = require("../../services/work-order.service");
let WorkOrderController = class WorkOrderController {
    constructor(workOrderService) {
        this.workOrderService = workOrderService;
    }
    async getDetails(workOrderCode) {
        const res = {};
        try {
            res.data = await this.workOrderService.getByCode(workOrderCode);
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
            res.data = await this.workOrderService.getPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(workOrderDto) {
        const res = {};
        try {
            res.data = await this.workOrderService.create(workOrderDto);
            res.success = true;
            res.message = `Work Order ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async update(workOrderCode, dto) {
        const res = {};
        try {
            res.data = await this.workOrderService.update(workOrderCode, dto);
            res.success = true;
            res.message = `Work Order ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async updateStatus(workOrderCode, dto) {
        const res = {};
        try {
            res.data = await this.workOrderService.updateStatus(workOrderCode, dto);
            res.success = true;
            res.message = `Work Order status ${api_response_constant_1.UPDATE_SUCCESS}`;
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
    (0, common_1.Get)("/:workOrderCode"),
    __param(0, (0, common_1.Param)("workOrderCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkOrderController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], WorkOrderController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [work_order_create_dto_1.CreateWorkOrderDto]),
    __metadata("design:returntype", Promise)
], WorkOrderController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("/:workOrderCode"),
    __param(0, (0, common_1.Param)("workOrderCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, work_order_update_dto_1.UpdateWorkOrderDto]),
    __metadata("design:returntype", Promise)
], WorkOrderController.prototype, "update", null);
__decorate([
    (0, common_1.Put)("/updateStatus/:workOrderCode"),
    __param(0, (0, common_1.Param)("workOrderCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, work_order_update_dto_1.UpdateWorkOrderStatusDto]),
    __metadata("design:returntype", Promise)
], WorkOrderController.prototype, "updateStatus", null);
WorkOrderController = __decorate([
    (0, swagger_1.ApiTags)("work-order"),
    (0, common_1.Controller)("work-order"),
    __metadata("design:paramtypes", [work_order_service_1.WorkOrderService])
], WorkOrderController);
exports.WorkOrderController = WorkOrderController;
//# sourceMappingURL=work-order.controller.js.map