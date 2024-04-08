import { UpdateLotMapDataDto } from "src/core/dto/lot/lot.update.dto";
import { Lot } from "src/db/entities/Lot";
import { Repository } from "typeorm";
export declare class LotService {
    private readonly lotsRepo;
    constructor(lotsRepo: Repository<Lot>);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Lot[];
        total: number;
    }>;
    getByBlock(block: any): Promise<Lot[]>;
    getByCode(lotCode: any): Promise<Lot>;
    updateMapData(lotCode: any, dto: UpdateLotMapDataDto): Promise<Lot>;
}
