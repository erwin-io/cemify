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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultBurialDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const moment_1 = __importDefault(require("moment"));
class DefaultBurialDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({
        message: "Not allowed, First name is required!"
    }),
    __metadata("design:type", String)
], DefaultBurialDto.prototype, "burialFirstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DefaultBurialDto.prototype, "burialMiddleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({
        message: "Not allowed, Last name is required!"
    }),
    __metadata("design:type", String)
], DefaultBurialDto.prototype, "burialLastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({
        message: "Not allowed, Address is required!"
    }),
    __metadata("design:type", String)
], DefaultBurialDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DefaultBurialDto.prototype, "burialAge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: (0, moment_1.default)().format("YYYY-MM-DD")
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)({ strict: true }),
    __metadata("design:type", Date)
], DefaultBurialDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: (0, moment_1.default)().format("YYYY-MM-DD")
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)({ strict: true }),
    __metadata("design:type", Date)
], DefaultBurialDto.prototype, "dateOfDeath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: (0, moment_1.default)().format("YYYY-MM-DD")
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)({ strict: true }),
    __metadata("design:type", Date)
], DefaultBurialDto.prototype, "dateOfBurial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({
        message: "Not allowed, Family contact person is required!"
    }),
    __metadata("design:type", String)
], DefaultBurialDto.prototype, "familyContactPerson", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({
        message: "Not allowed, Family contact number is required!"
    }),
    __metadata("design:type", String)
], DefaultBurialDto.prototype, "familyContactNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({
        message: "Not allowed, Assigned user is required!"
    }),
    __metadata("design:type", String)
], DefaultBurialDto.prototype, "assignedStaffUserId", void 0);
exports.DefaultBurialDto = DefaultBurialDto;
//# sourceMappingURL=burial-base.dto.js.map