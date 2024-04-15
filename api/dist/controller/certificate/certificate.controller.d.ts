import { StreamableFile } from "@nestjs/common";
import { BurialService } from "src/services/burial.service";
export declare class CertificateController {
    private burialService;
    constructor(burialService: BurialService);
    download(response: any, burialCode: string): Promise<StreamableFile>;
}
