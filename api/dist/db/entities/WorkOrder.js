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
exports.WorkOrder = void 0;
const typeorm_1 = require("typeorm");
const Burial_1 = require("./Burial");
const Users_1 = require("./Users");
let WorkOrder = class WorkOrder {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "WorkOrderId" }),
    __metadata("design:type", String)
], WorkOrder.prototype, "workOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "WorkOrderCode", nullable: true }),
    __metadata("design:type", String)
], WorkOrder.prototype, "workOrderCode", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "DateTargetCompletion" }),
    __metadata("design:type", String)
], WorkOrder.prototype, "dateTargetCompletion", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Title" }),
    __metadata("design:type", String)
], WorkOrder.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Description" }),
    __metadata("design:type", String)
], WorkOrder.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Status", default: () => "'PENDING'" }),
    __metadata("design:type", String)
], WorkOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], WorkOrder.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Burial_1.Burial, (burial) => burial.workOrder),
    __metadata("design:type", Array)
], WorkOrder.prototype, "burials", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.workOrders),
    (0, typeorm_1.JoinColumn)([{ name: "AssignedStaffUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], WorkOrder.prototype, "assignedStaffUser", void 0);
WorkOrder = __decorate([
    (0, typeorm_1.Index)("WorkOrder_pkey", ["workOrderId"], { unique: true }),
    (0, typeorm_1.Entity)("WorkOrder", { schema: "dbo" })
], WorkOrder);
exports.WorkOrder = WorkOrder;
//# sourceMappingURL=WorkOrder.js.map