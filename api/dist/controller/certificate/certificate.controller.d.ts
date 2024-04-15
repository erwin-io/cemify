import { StreamableFile } from "@nestjs/common";
import { BurialService } from "src/services/burial.service";
import { ConfigService } from "@nestjs/config";
export declare class CertificateController {
    private burialService;
    private readonly config;
    constructor(burialService: BurialService, config: ConfigService);
    download(response: any, burialCode: string): Promise<StreamableFile>;
}
