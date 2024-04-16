import { ApiResponseModel } from "src/core/models/api-response.model";
import { UpdateSettingsDto, UploadCertificateTemplateDto } from "src/core/dto/settings/settings.dto";
import { SystemConfig } from "src/db/entities/SystemConfig";
import { SettingsService } from "src/services/settings.service";
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getAll(): Promise<ApiResponseModel<SystemConfig[]>>;
    find(key: string): Promise<ApiResponseModel<SystemConfig>>;
    update(dto: UpdateSettingsDto): Promise<ApiResponseModel<SystemConfig>>;
    uploadCertificateTemplate(dto: UploadCertificateTemplateDto): Promise<ApiResponseModel<SystemConfig>>;
}
