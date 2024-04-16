import { StreamableFile } from "@nestjs/common";
import { BurialService } from "src/services/burial.service";
import { ConfigService } from "@nestjs/config";
import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
export declare class CertificateController {
    private firebaseProvoder;
    private burialService;
    private readonly config;
    constructor(firebaseProvoder: FirebaseProvider, burialService: BurialService, config: ConfigService);
    download(response: any, burialCode: string): Promise<StreamableFile>;
}
