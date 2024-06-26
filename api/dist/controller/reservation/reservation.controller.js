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
exports.ReservationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const reservation_create_dto_1 = require("../../core/dto/reservation/reservation.create.dto");
const reservation_update_dto_1 = require("../../core/dto/reservation/reservation.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const reservation_service_1 = require("../../services/reservation.service");
let ReservationController = class ReservationController {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    async getDetails(reservationCode) {
        const res = {};
        try {
            res.data = await this.reservationService.getByCode(reservationCode);
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
            res.data = await this.reservationService.getPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(reservationDto) {
        const res = {};
        try {
            res.data = await this.reservationService.create(reservationDto);
            res.success = true;
            res.message = `Reservation ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async update(reservationCode, dto) {
        const res = {};
        try {
            res.data = await this.reservationService.update(reservationCode, dto);
            res.success = true;
            res.message = `Reservation ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async updateStatus(reservationCode, dto) {
        const res = {};
        try {
            res.data = await this.reservationService.updateStatus(reservationCode, dto);
            res.success = true;
            res.message = `Reservation status ${api_response_constant_1.UPDATE_SUCCESS}`;
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
    (0, common_1.Get)("/:reservationCode"),
    __param(0, (0, common_1.Param)("reservationCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reservation_create_dto_1.CreateReservationDto]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("/:reservationCode"),
    __param(0, (0, common_1.Param)("reservationCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reservation_update_dto_1.UpdateReservationDto]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "update", null);
__decorate([
    (0, common_1.Put)("/updateStatus/:reservationCode"),
    __param(0, (0, common_1.Param)("reservationCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reservation_update_dto_1.UpdateReservationStatusDto]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "updateStatus", null);
ReservationController = __decorate([
    (0, swagger_1.ApiTags)("reservation"),
    (0, common_1.Controller)("reservation"),
    __metadata("design:paramtypes", [reservation_service_1.ReservationService])
], ReservationController);
exports.ReservationController = ReservationController;
//# sourceMappingURL=reservation.controller.js.map