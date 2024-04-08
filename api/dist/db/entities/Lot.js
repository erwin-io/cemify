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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lot = void 0;
const typeorm_1 = require("typeorm");
const Burial_1 = require("./Burial");
const Reservation_1 = require("./Reservation");
let Lot = class Lot {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "LotId" }),
    __metadata("design:type", String)
], Lot.prototype, "lotId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "LotCode" }),
    __metadata("design:type", String)
], Lot.prototype, "lotCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Block" }),
    __metadata("design:type", String)
], Lot.prototype, "block", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "Level" }),
    __metadata("design:type", String)
], Lot.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)("json", { name: "MapData", default: {} }),
    __metadata("design:type", Object)
], Lot.prototype, "mapData", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Status", default: () => "'EMPTY'" }),
    __metadata("design:type", String)
], Lot.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Burial_1.Burial, (burial) => burial.lot),
    __metadata("design:type", Array)
], Lot.prototype, "burials", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Reservation_1.Reservation, (reservation) => reservation.lot),
    __metadata("design:type", Array)
], Lot.prototype, "reservations", void 0);
Lot = __decorate([
    (0, typeorm_1.Index)("Lot_LotCode_idx", ["lotCode"], { unique: true }),
    (0, typeorm_1.Index)("Lot_pkey", ["lotId"], { unique: true }),
    (0, typeorm_1.Entity)("Lot", { schema: "dbo" })
], Lot);
exports.Lot = Lot;
//# sourceMappingURL=Lot.js.map