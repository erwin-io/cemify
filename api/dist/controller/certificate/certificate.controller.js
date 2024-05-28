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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const burial_service_1 = require("../../services/burial.service");
const docx_templates_1 = __importDefault(require("docx-templates"));
const moment_1 = __importDefault(require("moment"));
const config_1 = require("@nestjs/config");
const firebase_provider_1 = require("../../core/provider/firebase/firebase-provider");
const settings_service_1 = require("../../services/settings.service");
let CertificateController = class CertificateController {
    constructor(firebaseProvoder, burialService, settingsService, config) {
        this.firebaseProvoder = firebaseProvoder;
        this.burialService = burialService;
        this.settingsService = settingsService;
        this.config = config;
    }
    async download(response, burialCode, date) {
        const res = {};
        try {
            if (!date || date === undefined || date === "") {
                date = new Date();
            }
            const burial = await this.burialService.getByCode(burialCode);
            if (!burial) {
                throw new Error("Burial records not found");
            }
            const templateConfig = await this.settingsService.find("CERTIFICATE_TEMPLATE");
            if (!templateConfig) {
                throw new Error("Certificate error: Template path not set!");
            }
            const delimitersConfig = await this.settingsService.find("CERTIFICATE_TEMPLATE_PROPS");
            if (!delimitersConfig ||
                !(delimitersConfig === null || delimitersConfig === void 0 ? void 0 : delimitersConfig.value) ||
                (delimitersConfig === null || delimitersConfig === void 0 ? void 0 : delimitersConfig.value) === "" ||
                (delimitersConfig === null || delimitersConfig === void 0 ? void 0 : delimitersConfig.value.toString().split(",").length) === 0 ||
                (delimitersConfig === null || delimitersConfig === void 0 ? void 0 : delimitersConfig.value.toString().split(",").length) > 2) {
                throw new Error("Certificate error: Template delimiters not set!");
            }
            const delimiters = delimitersConfig.value.toString().split(",");
            const templatePath = templateConfig.value;
            console.log(templatePath);
            const bucket = this.firebaseProvoder.app.storage().bucket();
            const file = bucket.file(`${templatePath}`);
            const result = await file.download();
            const generatedDocumentWithDate = await (0, docx_templates_1.default)({
                template: result[0],
                data: {
                    day: (0, moment_1.default)(date, "YYYY-MM-DD").format("Do"),
                    month: (0, moment_1.default)(date, "YYYY-MM-DD").format("MMMM"),
                    year: (0, moment_1.default)(date, "YYYY-MM-DD").format("YYYY"),
                },
                cmdDelimiter: ["[[", "]]"],
            });
            const generatedDocument = await (0, docx_templates_1.default)({
                template: generatedDocumentWithDate,
                data: {
                    fullName: burial === null || burial === void 0 ? void 0 : burial.burialFullName,
                    dateOfDeath: (0, moment_1.default)(burial === null || burial === void 0 ? void 0 : burial.dateOfDeath).format("MMMM DD, YYYY"),
                    dateOfBurial: (0, moment_1.default)(burial === null || burial === void 0 ? void 0 : burial.dateOfBurial).format("MMMM DD, YYYY"),
                    familyContactPerson: burial === null || burial === void 0 ? void 0 : burial.familyContactPerson,
                },
                cmdDelimiter: [delimiters[0], delimiters[1]],
            });
            const buffer = generatedDocument;
            response.setHeader("Content-Type", `application/vnd.openxmlformats-officedocument.wordprocessingml.document`);
            const fileName = templatePath.split(".")[templatePath.split(".").length - 1];
            console.log();
            response.setHeader("Content-Disposition", `attachment; filename=${burial.burialFullName}.${fileName}`);
            return new common_1.StreamableFile(Buffer.from(buffer));
        }
        catch (e) {
            throw new common_1.HttpException(e.message !== undefined ? e.message : e, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Get)("/:burialCode"),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Param)("burialCode")),
    __param(2, (0, common_1.Query)("date")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CertificateController.prototype, "download", null);
CertificateController = __decorate([
    (0, swagger_1.ApiTags)("certificate"),
    (0, common_1.Controller)("certificate"),
    __metadata("design:paramtypes", [firebase_provider_1.FirebaseProvider,
        burial_service_1.BurialService,
        settings_service_1.SettingsService,
        config_1.ConfigService])
], CertificateController);
exports.CertificateController = CertificateController;
//# sourceMappingURL=certificate.controller.js.map