import { AnnualFilterDashboardDto } from "src/core/dto/dashboard/dashboard-base.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Burial } from "src/db/entities/Burial";
import { DashboardService } from "src/services/dashboard.service";
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getLot(): Promise<ApiResponseModel<{
        totalAvailable: number;
        totalOccupied: number;
        totalUnavailable: number;
    }>>;
    getBurialAndReservationRecords(): Promise<ApiResponseModel<{
        totalRecords: number;
        totalPending: number;
        totalForLeased: number;
    }>>;
    getUsers(): Promise<ApiResponseModel<{
        totalClient: number;
        totalAdmin: number;
        totalStaff: number;
    }>>;
    getLotTrackerByBlock(): Promise<ApiResponseModel<{
        a: any;
        b: any;
        c: any;
        d: any;
        e: any;
    }>>;
    getAnnualBurialReport(dto: AnnualFilterDashboardDto): Promise<ApiResponseModel<Burial[]>>;
}
