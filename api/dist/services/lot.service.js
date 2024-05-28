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
const Burial_1 = require("../db/entities/Burial");
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
            relations: {
                burials: true,
            },
        });
        return result;
    }
    async getByCode(lotCode) {
        const [result] = await this.lotsRepo.query(`
    select 
    l."LotCode" as "lotCode",  
    l."Block" as "block",  
    l."Level" as "level",  
    l."MapData" as "mapData",  
    l."Status" as "status",
    b."BurialId" as "burialId", 
    b."BurialCode" as "burialCode", 
    b."BurialFullName" as "burialFullName",
    b."BurialFirstName" as "burialFirstName",
    b."BurialMiddleName" as "burialMiddleName", 
    b."BurialLastName" as "burialLastName", 
    b."BurialAge" as "burialAge", 
    b."Address" as "address", 
    b."DateOfBirth" as "dateOfBirth", 
    b."DateOfDeath" as "dateOfDeath", 
    b."DateOfBurial" as "dateOfBurial", 
    b."FamilyContactPerson" as "familyContactPerson", 
    b."FamilyContactNumber" as "familyContactNumber", 
    b."FromReservation" as "fromReservation", 
    b."Active" as "burialId", 
    b."LotId" as "lotId" FROM dbo."Lot" l
  left join dbo."Burial" b ON l."LotId" = b."LotId"
  where l."LotCode" = '${lotCode}'`);
        if (!result) {
            throw Error(lot_constant_1.LOT_ERROR_NOT_FOUND);
        }
        return {
            lotId: result.lotId,
            lotCode: result.lotCode,
            block: result.block,
            level: result.level,
            mapData: result.mapData,
            status: result.status,
            burial: {
                burialId: result.burialId,
                burialCode: result.burialCode,
                fullName: result.fullName,
                dateOfBirth: result.dateOfBirth,
                dateOfDeath: result.dateOfDeath,
                dateOfBurial: result.dateOfBurial,
                familyContactPerson: result.familyContactPerson,
                familyContactNumber: result.familyContactNumber,
                fromReservation: result.fromReservation,
                active: result.active,
            },
        };
    }
    async updateStatus(lotCode, dto) {
        return await this.lotsRepo.manager.transaction(async (entityManager) => {
            const { status } = dto;
            let lot = await entityManager.findOne(Lot_1.Lot, {
                where: {
                    lotCode,
                },
            });
            if (!lot) {
                throw Error(lot_constant_1.LOT_ERROR_NOT_FOUND);
            }
            if (lot.status === status) {
                throw Error("Lot was already " + status.toLowerCase());
            }
            const burial = await entityManager.findOne(Burial_1.Burial, {
                where: {
                    active: true,
                    lot: {
                        lotCode,
                    },
                },
            });
            if (burial) {
                throw Error(`Cannot update ${status.toLowerCase()} to unavailable, lot was already occupied for burial`);
            }
            lot.status = status;
            lot = await entityManager.save(Lot_1.Lot, lot);
            return lot;
        });
    }
    async updateMapData(lotCode, dto) {
        return await this.lotsRepo.manager.transaction(async (entityManager) => {
            let lot = await entityManager.findOne(Lot_1.Lot, {
                where: {
                    lotCode,
                },
            });
            if (!lot) {
                throw Error(lot_constant_1.LOT_ERROR_NOT_FOUND);
            }
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