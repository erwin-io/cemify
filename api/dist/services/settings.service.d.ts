import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
import { SystemConfig } from "src/db/entities/SystemConfig";
import { Repository } from "typeorm";
export declare class SettingsService {
    private firebaseProvoder;
    private readonly systemConfigRepo;
    constructor(firebaseProvoder: FirebaseProvider, systemConfigRepo: Repository<SystemConfig>);
    getAll(): Promise<SystemConfig[]>;
    update({ key, value }: {
        key: any;
        value: any;
    }): Promise<SystemConfig>;
    find(key: any): Promise<SystemConfig>;
    uploadCertificateTemplate({ fileName, base64 }: {
        fileName: any;
        base64: any;
    }): Promise<SystemConfig>;
}
