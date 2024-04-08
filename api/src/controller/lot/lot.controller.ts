import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  DELETE_SUCCESS,
  SAVING_SUCCESS,
  UPDATE_SUCCESS,
} from "src/common/constant/api-response.constant";
import { UpdateLotMapDataDto } from "src/core/dto/lot/lot.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Lot } from "src/db/entities/Lot";
import { LotService } from "src/services/lot.service";

@ApiTags("lot")
@Controller("lot")
export class LotController {
  constructor(private readonly lotService: LotService) {}

  @Get("/:lotCode")
  //   @UseGuards(JwtAuthGuard)
  async getByCode(@Param("lotCode") lotCode: string) {
    const res = {} as ApiResponseModel<Lot>;
    try {
      res.data = await this.lotService.getByCode(lotCode);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Get("getByBlock/:block")
  //   @UseGuards(JwtAuthGuard)
  async getByBlock(@Param("block") block: string) {
    const res = {} as ApiResponseModel<Lot[]>;
    try {
      res.data = await this.lotService.getByBlock(block);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("/page")
  //   @UseGuards(JwtAuthGuard)
  async getPaginated(@Body() params: PaginationParamsDto) {
    const res: ApiResponseModel<{ results: Lot[]; total: number }> = {} as any;
    try {
      res.data = await this.lotService.getPagination(params);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("/updateMapData/:lotCode")
  //   @UseGuards(JwtAuthGuard)
  async updateMapData(
    @Param("lotCode") lotCode: string,
    @Body() body: UpdateLotMapDataDto
  ) {
    const res: ApiResponseModel<Lot> = {} as any;
    try {
      res.data = await this.lotService.updateMapData(lotCode, body);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
