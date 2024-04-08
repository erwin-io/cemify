import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LOT_ERROR_NOT_FOUND } from "src/common/constant/lot.constant";
import { columnDefToTypeORMCondition } from "src/common/utils/utils";
import { LotMapDataDto, UpdateLotMapDataDto } from "src/core/dto/lot/lot.update.dto";
import { Lot } from "src/db/entities/Lot";
import { Repository } from "typeorm";

@Injectable()
export class LotService {
  constructor(
    @InjectRepository(Lot)
    private readonly lotsRepo: Repository<Lot>
  ) {}

  async getPagination({ pageSize, pageIndex, order, columnDef }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);

    const condition = columnDefToTypeORMCondition(columnDef);
    const [results, total] = await Promise.all([
      this.lotsRepo.find({
        where: condition,
        skip,
        take,
        order,
      }),
      this.lotsRepo.count({
        where: condition,
      }),
    ]);
    return {
      results,
      total,
    };
  }

  async getByBlock(block) {
    const result = await this.lotsRepo.find({
      where: {
        block,
      },
    });
    return result;
  }

  async getByCode(lotCode) {
    const result = await this.lotsRepo.findOne({
      where: {
        lotCode,
      },
    });
    if (!result) {
      throw Error(LOT_ERROR_NOT_FOUND);
    }
    return result;
  }

  async updateMapData(lotCode, dto: UpdateLotMapDataDto) {
    return await this.lotsRepo.manager.transaction(async (entityManager) => {
      let lot = await entityManager.findOne(Lot, {
        where: {
          lotCode,
        },
      });
      const currentMapData = lot.mapData as LotMapDataDto;
      currentMapData.pan = dto.mapData.pan;
      currentMapData.zoom = dto.mapData.zoom;
      lot.mapData = currentMapData;
      lot = await entityManager.save(Lot, lot);
      return lot;
    });
  }
}
