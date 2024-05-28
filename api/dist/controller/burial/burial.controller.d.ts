import { CreateBurialFromReservationDto, CreateBurialDto } from "src/core/dto/burial/burial.create.dto";
import { UpdateBurialDto } from "src/core/dto/burial/burial.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Burial } from "src/db/entities/Burial";
import { Lot } from "src/db/entities/Lot";
import { BurialService } from "src/services/burial.service";
export declare class BurialController {
    private readonly burialService;
    constructor(burialService: BurialService);
    searcMap(key: string): Promise<ApiResponseModel<{
        lot: Lot[];
        burial: Burial[];
    }>>;
    getAllByClientUserCode(userCode: string): Promise<ApiResponseModel<any[]>>;
    getDetails(burialCode: string): Promise<ApiResponseModel<Burial>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: Burial[];
        total: number;
    }>>;
    create(dto: CreateBurialDto): Promise<ApiResponseModel<Burial>>;
    createFromReservation(dto: CreateBurialFromReservationDto): Promise<ApiResponseModel<Burial>>;
    update(burialCode: string, dto: UpdateBurialDto): Promise<ApiResponseModel<Burial>>;
    delete(burialCode: string): Promise<ApiResponseModel<Burial>>;
}
