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
let CertificateController = class CertificateController {
    constructor(firebaseProvoder, burialService, config) {
        this.firebaseProvoder = firebaseProvoder;
        this.burialService = burialService;
        this.config = config;
    }
    async download(response, burialCode) {
        const res = {};
        try {
            const burial = await this.burialService.getByCode(burialCode);
            if (!burial) {
                throw new Error("Burial records not found");
            }
            const templatePath = this.config.get("CERTIFICATE_TEMPLATE");
            console.log(templatePath);
            const bucket = this.firebaseProvoder.app.storage().bucket();
            const file = bucket.file(`${templatePath}`);
            const result = await file.download();
            const buffer = await (0, docx_templates_1.default)({
                template: result[0],
                data: {
                    fullName: burial === null || burial === void 0 ? void 0 : burial.fullName,
                    dateOfDeath: (0, moment_1.default)(burial === null || burial === void 0 ? void 0 : burial.dateOfDeath).format("MMMM DD, YYYY"),
                    dateOfBurial: (0, moment_1.default)(burial === null || burial === void 0 ? void 0 : burial.dateOfBurial).format("MMMM DD, YYYY"),
                    familyContactPerson: burial === null || burial === void 0 ? void 0 : burial.familyContactPerson,
                    day: (0, moment_1.default)().format("DD"),
                    month: (0, moment_1.default)().format("MMMM"),
                    year: (0, moment_1.default)().format("YYYY"),
                },
                cmdDelimiter: ["{", "}"],
            });
            response.setHeader("Content-Type", `application/vnd.openxmlformats-officedocument.wordprocessingml.document`);
            const fileName = templatePath.split(".")[templatePath.split(".").length - 1];
            console.log();
            response.setHeader("Content-Disposition", `attachment; filename=${burial.fullName}.${fileName}`);
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CertificateController.prototype, "download", null);
CertificateController = __decorate([
    (0, swagger_1.ApiTags)("certificate"),
    (0, common_1.Controller)("certificate"),
    __metadata("design:paramtypes", [firebase_provider_1.FirebaseProvider,
        burial_service_1.BurialService,
        config_1.ConfigService])
], CertificateController);
exports.CertificateController = CertificateController;
//# sourceMappingURL=certificate.controller.js.map