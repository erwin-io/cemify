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
exports.Reservation = void 0;
const typeorm_1 = require("typeorm");
const Burial_1 = require("./Burial");
const Lot_1 = require("./Lot");
const Users_1 = require("./Users");
let Reservation = class Reservation {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "ReservationId" }),
    __metadata("design:type", String)
], Reservation.prototype, "reservationId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "ReservationCode", nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "reservationCode", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "DateTime" }),
    __metadata("design:type", Date)
], Reservation.prototype, "dateTime", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "BurialFullName" }),
    __metadata("design:type", String)
], Reservation.prototype, "burialFullName", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "DateOfBirth" }),
    __metadata("design:type", String)
], Reservation.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "DateOfDeath" }),
    __metadata("design:type", String)
], Reservation.prototype, "dateOfDeath", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "DateOfBurial" }),
    __metadata("design:type", String)
], Reservation.prototype, "dateOfBurial", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "FamilyContactPerson" }),
    __metadata("design:type", String)
], Reservation.prototype, "familyContactPerson", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "FamilyContactNumber" }),
    __metadata("design:type", String)
], Reservation.prototype, "familyContactNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Status", default: () => "'PENDING'" }),
    __metadata("design:type", String)
], Reservation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Reservation.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "BurialFirstName", default: () => "''" }),
    __metadata("design:type", String)
], Reservation.prototype, "burialFirstName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "BurialMiddleName",
        nullable: true,
        default: () => "''",
    }),
    __metadata("design:type", String)
], Reservation.prototype, "burialMiddleName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "BurialLastName", default: () => "''" }),
    __metadata("design:type", String)
], Reservation.prototype, "burialLastName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Address", default: () => "''" }),
    __metadata("design:type", String)
], Reservation.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "BurialAge", default: () => "0" }),
    __metadata("design:type", String)
], Reservation.prototype, "burialAge", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Burial_1.Burial, (burial) => burial.reservation),
    __metadata("design:type", Array)
], Reservation.prototype, "burials", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Lot_1.Lot, (lot) => lot.reservations),
    (0, typeorm_1.JoinColumn)([{ name: "LotId", referencedColumnName: "lotId" }]),
    __metadata("design:type", Lot_1.Lot)
], Reservation.prototype, "lot", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.reservations),
    (0, typeorm_1.JoinColumn)([{ name: "UserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Reservation.prototype, "user", void 0);
Reservation = __decorate([
    (0, typeorm_1.Index)("Reservation_pkey", ["reservationId"], { unique: true }),
    (0, typeorm_1.Entity)("Reservation", { schema: "dbo" })
], Reservation);
exports.Reservation = Reservation;
//# sourceMappingURL=Reservation.js.map