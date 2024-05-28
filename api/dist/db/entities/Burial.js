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
exports.Burial = void 0;
const typeorm_1 = require("typeorm");
const Lot_1 = require("./Lot");
const Reservation_1 = require("./Reservation");
const WorkOrder_1 = require("./WorkOrder");
let Burial = class Burial {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "BurialId" }),
    __metadata("design:type", String)
], Burial.prototype, "burialId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "BurialCode", nullable: true }),
    __metadata("design:type", String)
], Burial.prototype, "burialCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "BurialFullName" }),
    __metadata("design:type", String)
], Burial.prototype, "burialFullName", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "DateOfBirth" }),
    __metadata("design:type", String)
], Burial.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "DateOfDeath" }),
    __metadata("design:type", String)
], Burial.prototype, "dateOfDeath", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "DateOfBurial" }),
    __metadata("design:type", String)
], Burial.prototype, "dateOfBurial", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "FamilyContactPerson" }),
    __metadata("design:type", String)
], Burial.prototype, "familyContactPerson", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "FamilyContactNumber" }),
    __metadata("design:type", String)
], Burial.prototype, "familyContactNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "FromReservation", default: () => "false" }),
    __metadata("design:type", Boolean)
], Burial.prototype, "fromReservation", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Burial.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "BurialFirstName", default: () => "''" }),
    __metadata("design:type", String)
], Burial.prototype, "burialFirstName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "BurialMiddleName",
        nullable: true,
        default: () => "''",
    }),
    __metadata("design:type", String)
], Burial.prototype, "burialMiddleName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "BurialLastName", default: () => "''" }),
    __metadata("design:type", String)
], Burial.prototype, "burialLastName", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "BurialAge", default: () => "0" }),
    __metadata("design:type", String)
], Burial.prototype, "burialAge", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Address", default: () => "''" }),
    __metadata("design:type", String)
], Burial.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)("date", {
        name: "LeasedDate",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", String)
], Burial.prototype, "leasedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Lot_1.Lot, (lot) => lot.burials),
    (0, typeorm_1.JoinColumn)([{ name: "LotId", referencedColumnName: "lotId" }]),
    __metadata("design:type", Lot_1.Lot)
], Burial.prototype, "lot", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Reservation_1.Reservation, (reservation) => reservation.burials),
    (0, typeorm_1.JoinColumn)([
        { name: "ReservationId", referencedColumnName: "reservationId" },
    ]),
    __metadata("design:type", Reservation_1.Reservation)
], Burial.prototype, "reservation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => WorkOrder_1.WorkOrder, (workOrder) => workOrder.burials),
    (0, typeorm_1.JoinColumn)([{ name: "WorkOrderId", referencedColumnName: "workOrderId" }]),
    __metadata("design:type", WorkOrder_1.WorkOrder)
], Burial.prototype, "workOrder", void 0);
Burial = __decorate([
    (0, typeorm_1.Index)("Burial_pkey", ["burialId"], { unique: true }),
    (0, typeorm_1.Entity)("Burial", { schema: "dbo" })
], Burial);
exports.Burial = Burial;
//# sourceMappingURL=Burial.js.map