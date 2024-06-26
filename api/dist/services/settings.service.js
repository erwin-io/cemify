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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const settings_constant_1 = require("../common/constant/settings.constant");
const firebase_provider_1 = require("../core/provider/firebase/firebase-provider");
const SystemConfig_1 = require("../db/entities/SystemConfig");
const typeorm_2 = require("typeorm");
let SettingsService = class SettingsService {
    constructor(firebaseProvoder, systemConfigRepo) {
        this.firebaseProvoder = firebaseProvoder;
        this.systemConfigRepo = systemConfigRepo;
    }
    getAll() {
        return this.systemConfigRepo.find();
    }
    async update({ key, value }) {
        return await this.systemConfigRepo.manager.transaction(async (entityManager) => {
            const systemConfig = await entityManager.findOne(SystemConfig_1.SystemConfig, {
                where: {
                    key,
                },
            });
            if (!systemConfig) {
                throw Error(settings_constant_1.SETTINGS_ERROR_NOT_FOUND);
            }
            systemConfig.value = value;
            return await entityManager.save(SystemConfig_1.SystemConfig, systemConfig);
        });
    }
    find(key) {
        return this.systemConfigRepo.findOneBy({
            key,
        });
    }
    async uploadCertificateTemplate({ fileName, base64 }) {
        return await this.systemConfigRepo.manager.transaction(async (entityManager) => {
            let settings = await this.systemConfigRepo.findOneBy({
                key: "CERTIFICATE_TEMPLATE",
            });
            if (!settings) {
                throw new Error(settings_constant_1.SETTINGS_ERROR_NOT_FOUND);
            }
            if (fileName && base64) {
                const bucket = this.firebaseProvoder.app.storage().bucket();
                if ((settings === null || settings === void 0 ? void 0 : settings.key) && (settings === null || settings === void 0 ? void 0 : settings.key) !== "") {
                    if (settings.value && settings.value !== "") {
                        try {
                            const deleteFile = bucket.file(settings.value);
                            const exists = await deleteFile.exists();
                            if (exists[0]) {
                                deleteFile.delete();
                            }
                        }
                        catch (ex) {
                            console.log(ex);
                        }
                    }
                    settings.value = fileName;
                    const bucketFile = bucket.file(settings.value);
                    const file = Buffer.from(base64, "base64");
                    await bucketFile.save(file).then(async (res) => {
                        console.log("res");
                        console.log(res);
                        await bucketFile.getSignedUrl({
                            action: "read",
                            expires: "03-09-2500",
                        });
                        settings = await entityManager.save(SystemConfig_1.SystemConfig, settings);
                    });
                }
                return settings;
            }
        });
    }
};
SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(SystemConfig_1.SystemConfig)),
    __metadata("design:paramtypes", [firebase_provider_1.FirebaseProvider,
        typeorm_2.Repository])
], SettingsService);
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map