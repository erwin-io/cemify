"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateModule = void 0;
const common_1 = require("@nestjs/common");
const certificate_controller_1 = require("./certificate.controller");
const burial_service_1 = require("../../services/burial.service");
const typeorm_1 = require("@nestjs/typeorm");
const Burial_1 = require("../../db/entities/Burial");
const burial_module_1 = require("../burial/burial.module");
const firebase_provider_module_1 = require("../../core/provider/firebase/firebase-provider.module");
const settings_module_1 = require("../settings/settings.module");
let CertificateModule = class CertificateModule {
};
CertificateModule = __decorate([
    (0, common_1.Module)({
        imports: [
            burial_module_1.BurialModule,
            settings_module_1.SettingsModule,
            firebase_provider_module_1.FirebaseProviderModule,
            typeorm_1.TypeOrmModule.forFeature([Burial_1.Burial]),
        ],
        controllers: [certificate_controller_1.CertificateController],
        providers: [burial_service_1.BurialService],
        exports: [burial_service_1.BurialService],
    })
], CertificateModule);
exports.CertificateModule = CertificateModule;
//# sourceMappingURL=certificate.module.js.map