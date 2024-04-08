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
exports.LotService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lot_constant_1 = require("../common/constant/lot.constant");
const utils_1 = require("../common/utils/utils");
const Lot_1 = require("../db/entities/Lot");
const typeorm_2 = require("typeorm");
let LotService = class LotService {
    constructor(lotsRepo) {
        this.lotsRepo = lotsRepo;
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.lotsRepo.find({
                where: condition,
                skip,
                take,
                order,
            }),
            this.lotsRepo.count({
                where: condition,
            }),
        ]);
        return {
            results,
            total,
        };
    }
    async getByBlock(block) {
        const result = await this.lotsRepo.find({
            where: {
                block,
            },
        });
        return result;
    }
    async getByCode(lotCode) {
        const result = await this.lotsRepo.findOne({
            where: {
                lotCode,
            },
        });
        if (!result) {
            throw Error(lot_constant_1.LOT_ERROR_NOT_FOUND);
        }
        return result;
    }
    async updateMapData(lotCode, dto) {
        return await this.lotsRepo.manager.transaction(async (entityManager) => {
            let lot = await entityManager.findOne(Lot_1.Lot, {
                where: {
                    lotCode,
                },
            });
            const currentMapData = lot.mapData;
            currentMapData.pan = dto.mapData.pan;
            currentMapData.zoom = dto.mapData.zoom;
            lot.mapData = currentMapData;
            lot = await entityManager.save(Lot_1.Lot, lot);
            return lot;
        });
    }
};
LotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Lot_1.Lot)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LotService);
exports.LotService = LotService;
//# sourceMappingURL=lot.service.js.map