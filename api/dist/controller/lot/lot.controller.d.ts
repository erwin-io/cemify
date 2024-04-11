import { UpdateLotMapDataDto, UpdateLotStatusDto } from "src/core/dto/lot/lot.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Lot } from "src/db/entities/Lot";
import { LotService } from "src/services/lot.service";
export declare class LotController {
    private readonly lotService;
    constructor(lotService: LotService);
    getByCode(lotCode: string): Promise<ApiResponseModel<any>>;
    getByBlock(block: string): Promise<ApiResponseModel<Lot[]>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: Lot[];
        total: number;
    }>>;
    updateStatus(lotCode: string, dto: UpdateLotStatusDto): Promise<ApiResponseModel<Lot>>;
    updateMapData(lotCode: string, body: UpdateLotMapDataDto): Promise<ApiResponseModel<Lot>>;
}
