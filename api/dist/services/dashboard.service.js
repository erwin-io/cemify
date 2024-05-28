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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lot_constant_1 = require("../common/constant/lot.constant");
const reservation_constant_1 = require("../common/constant/reservation.constant");
const user_type_constant_1 = require("../common/constant/user-type.constant");
const Burial_1 = require("../db/entities/Burial");
const Lot_1 = require("../db/entities/Lot");
const Reservation_1 = require("../db/entities/Reservation");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
let DashboardService = class DashboardService {
    constructor(lotRepo, reservationRepo, burialRepo, usersRepo) {
        this.lotRepo = lotRepo;
        this.reservationRepo = reservationRepo;
        this.burialRepo = burialRepo;
        this.usersRepo = usersRepo;
    }
    async getUsers() {
        const [totalClient, totalAdmin, totalStaff] = await Promise.all([
            this.usersRepo.count({
                where: {
                    userType: user_type_constant_1.USER_TYPE.CLIENT,
                    active: true,
                },
            }),
            this.usersRepo.count({
                where: {
                    userType: user_type_constant_1.USER_TYPE.ADMIN,
                    active: true,
                },
            }),
            this.usersRepo.count({
                where: {
                    userType: user_type_constant_1.USER_TYPE.STAFF,
                    active: true,
                },
            }),
        ]);
        return {
            totalClient,
            totalAdmin,
            totalStaff,
        };
    }
    async getBurialAndReservationRecords() {
        const [totalRecords, totalPending, totalForLeased] = await Promise.all([
            this.burialRepo.count({
                where: {
                    active: true,
                },
            }),
            this.reservationRepo.count({
                where: {
                    status: reservation_constant_1.RESERVATION_STATUS.PENDING,
                },
            }),
            this.reservationRepo.count({
                where: {
                    status: reservation_constant_1.RESERVATION_STATUS.APPROVED,
                },
            }),
        ]);
        return {
            totalRecords,
            totalPending,
            totalForLeased,
        };
    }
    async getLot() {
        const [totalAvailable, totalOccupied, totalUnavailable] = await Promise.all([
            this.lotRepo.count({
                where: {
                    status: lot_constant_1.LOT_STATUS.AVAILABLE,
                },
            }),
            this.lotRepo.count({
                where: {
                    status: lot_constant_1.LOT_STATUS.OCCUPIED,
                },
            }),
            this.lotRepo.count({
                where: {
                    status: lot_constant_1.LOT_STATUS.UNAVAILABLE,
                },
            }),
        ]);
        return {
            totalAvailable,
            totalOccupied,
            totalUnavailable,
        };
    }
    async getLotTrackerByBlock() {
        return await this.burialRepo.manager
            .query(`
		select l."Block" as "block", COUNT(b."BurialId") as "count" 
        from dbo."Burial" b LEFT JOIN dbo."Lot" l ON b."LotId" = l."LotId" GROUP BY l."Block"`)
            .then((res) => {
            var _a, _b, _c, _d, _e;
            const result = res.reduce((acc, current) => {
                const key = current.block.toLowerCase();
                const value = parseInt(current.count, 10);
                acc[key] = value;
                return acc;
            }, {});
            console.log(result);
            return {
                a: (_a = result["a"]) !== null && _a !== void 0 ? _a : 0,
                b: (_b = result["b"]) !== null && _b !== void 0 ? _b : 0,
                c: (_c = result["c"]) !== null && _c !== void 0 ? _c : 0,
                d: (_d = result["d"]) !== null && _d !== void 0 ? _d : 0,
                e: (_e = result["e"]) !== null && _e !== void 0 ? _e : 0,
            };
        });
    }
};
DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Lot_1.Lot)),
    __param(1, (0, typeorm_1.InjectRepository)(Reservation_1.Reservation)),
    __param(2, (0, typeorm_1.InjectRepository)(Burial_1.Burial)),
    __param(3, (0, typeorm_1.InjectRepository)(Users_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map