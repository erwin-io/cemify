import { CreateWorkOrderDto } from "src/core/dto/work-order/work-order.create.dto";
import { UpdateWorkOrderDto, UpdateWorkOrderStatusDto } from "src/core/dto/work-order/work-order.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { WorkOrder } from "src/db/entities/WorkOrder";
import { WorkOrderService } from "src/services/work-order.service";
export declare class WorkOrderController {
    private readonly workOrderService;
    constructor(workOrderService: WorkOrderService);
    getDetails(workOrderCode: string): Promise<ApiResponseModel<WorkOrder>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: WorkOrder[];
        total: number;
    }>>;
    create(workOrderDto: CreateWorkOrderDto): Promise<ApiResponseModel<WorkOrder>>;
    update(workOrderCode: string, dto: UpdateWorkOrderDto): Promise<ApiResponseModel<WorkOrder>>;
    updateStatus(workOrderCode: string, dto: UpdateWorkOrderStatusDto): Promise<ApiResponseModel<WorkOrder>>;
}
