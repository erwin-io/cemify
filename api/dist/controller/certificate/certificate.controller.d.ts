import { StreamableFile } from "@nestjs/common";
import { BurialService } from "src/services/burial.service";
import { ConfigService } from "@nestjs/config";
import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
import { SettingsService } from "src/services/settings.service";
export declare class CertificateController {
    private firebaseProvoder;
    private burialService;
    private settingsService;
    private readonly config;
    constructor(firebaseProvoder: FirebaseProvider, burialService: BurialService, settingsService: SettingsService, config: ConfigService);
    download(response: any, burialCode: string, date: any): Promise<StreamableFile>;
}
