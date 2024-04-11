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
exports.UpdateLotStatusDto = exports.UpdateLotMapDataDto = exports.LotMapDataDto = exports.PanMapData = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PanMapData {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj, key }) => {
        return Number(obj[key].toString());
    }),
    __metadata("design:type", String)
], PanMapData.prototype, "x", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj, key }) => {
        return Number(obj[key].toString());
    }),
    __metadata("design:type", String)
], PanMapData.prototype, "y", void 0);
exports.PanMapData = PanMapData;
class LotMapDataDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj, key }) => {
        return Number(obj[key].toString());
    }),
    __metadata("design:type", String)
], LotMapDataDto.prototype, "x", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj, key }) => {
        return Number(obj[key].toString());
    }),
    __metadata("design:type", String)
], LotMapDataDto.prototype, "y", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj, key }) => {
        return Number(obj[key].toString());
    }),
    __metadata("design:type", String)
], LotMapDataDto.prototype, "width", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj, key }) => {
        return Number(obj[key].toString());
    }),
    __metadata("design:type", String)
], LotMapDataDto.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LotMapDataDto.prototype, "transform", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        isArray: false,
        type: PanMapData,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => PanMapData),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", PanMapData)
], LotMapDataDto.prototype, "pan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj, key }) => {
        return Number(obj[key].toString());
    }),
    __metadata("design:type", String)
], LotMapDataDto.prototype, "zoom", void 0);
exports.LotMapDataDto = LotMapDataDto;
class UpdateLotMapDataDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        isArray: false,
        type: LotMapDataDto,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => LotMapDataDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", LotMapDataDto)
], UpdateLotMapDataDto.prototype, "mapData", void 0);
exports.UpdateLotMapDataDto = UpdateLotMapDataDto;
class UpdateLotStatusDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(["AVAILABLE", "UNAVAILABLE"]),
    (0, class_validator_1.IsUppercase)(),
    __metadata("design:type", String)
], UpdateLotStatusDto.prototype, "status", void 0);
exports.UpdateLotStatusDto = UpdateLotStatusDto;
//# sourceMappingURL=lot.update.dto.js.map