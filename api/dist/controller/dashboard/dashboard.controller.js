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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dashboard_base_dto_1 = require("../../core/dto/dashboard/dashboard-base.dto");
const dashboard_service_1 = require("../../services/dashboard.service");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getLot() {
        const res = {};
        try {
            res.data = await this.dashboardService.getLot();
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getBurialAndReservationRecords() {
        const res = {};
        try {
            res.data = await this.dashboardService.getBurialAndReservationRecords();
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getUsers() {
        const res = {};
        try {
            res.data = await this.dashboardService.getUsers();
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getLotTrackerByBlock() {
        const res = {};
        try {
            res.data = await this.dashboardService.getLotTrackerByBlock();
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getAnnualBurialReport(dto) {
        const res = {};
        try {
            res.data = await this.dashboardService.getAnnualBurialReport(dto.yearFrom, dto.yearTo);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getMonthlyBurialReport(year) {
        const res = {};
        try {
            res.data = await this.dashboardService.getMonthlyBurialReport(year);
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
    (0, common_1.Get)("/getLot"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getLot", null);
__decorate([
    (0, common_1.Get)("/getBurialAndReservationRecords"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getBurialAndReservationRecords", null);
__decorate([
    (0, common_1.Get)("/getUsers"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)("/getLotTrackerByBlock"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getLotTrackerByBlock", null);
__decorate([
    (0, common_1.Post)("/getAnnualBurialReport"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dashboard_base_dto_1.AnnualFilterDashboardDto]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getAnnualBurialReport", null);
__decorate([
    (0, common_1.Get)("/getMonthlyBurialReport/:year"),
    __param(0, (0, common_1.Param)("year")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getMonthlyBurialReport", null);
DashboardController = __decorate([
    (0, swagger_1.ApiTags)("dashboard"),
    (0, common_1.Controller)("dashboard"),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
exports.DashboardController = DashboardController;
//# sourceMappingURL=dashboard.controller.js.map