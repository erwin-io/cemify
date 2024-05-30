import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AnnualFilterDashboardDto } from "src/core/dto/dashboard/dashboard-base.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Burial } from "src/db/entities/Burial";
import { DashboardService } from "src/services/dashboard.service";

@ApiTags("dashboard")
@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("/getLot")
  //   @UseGuards(JwtAuthGuard)
  async getLot() {
    const res = {} as ApiResponseModel<{
      totalAvailable: number;
      totalOccupied: number;
      totalUnavailable: number;
    }>;
    try {
      res.data = await this.dashboardService.getLot();
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Get("/getBurialAndReservationRecords")
  //   @UseGuards(JwtAuthGuard)
  async getBurialAndReservationRecords() {
    const res = {} as ApiResponseModel<{
      totalRecords: number;
      totalPending: number;
      totalForLeased: number;
    }>;
    try {
      res.data = await this.dashboardService.getBurialAndReservationRecords();
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Get("/getUsers")
  //   @UseGuards(JwtAuthGuard)
  async getUsers() {
    const res = {} as ApiResponseModel<{
      totalClient: number;
      totalAdmin: number;
      totalStaff: number;
    }>;
    try {
      res.data = await this.dashboardService.getUsers();
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Get("/getLotTrackerByBlock")
  //   @UseGuards(JwtAuthGuard)
  async getLotTrackerByBlock() {
    const res = {} as ApiResponseModel<{
      a: any;
      b: any;
      c: any;
      d: any;
      e: any;
    }>;
    try {
      res.data = await this.dashboardService.getLotTrackerByBlock();
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("/getAnnualBurialReport")
  //   @UseGuards(JwtAuthGuard)
  async getAnnualBurialReport(@Body() dto: AnnualFilterDashboardDto) {
    const res = {} as ApiResponseModel<Burial[]>;
    try {
      res.data = await this.dashboardService.getAnnualBurialReport(
        dto.yearFrom,
        dto.yearTo
      );
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
