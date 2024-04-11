import { Users } from "src/db/entities/Users";
import { WorkOrder } from "src/db/entities/WorkOrder";
import { Repository, EntityManager } from "typeorm";
import { OneSignalNotificationService } from "./one-signal-notification.service";
import { PusherService } from "./pusher.service";
import { CreateWorkOrderDto } from "src/core/dto/work-order/work-order.create.dto";
import { UpdateWorkOrderDto, UpdateWorkOrderStatusDto } from "src/core/dto/work-order/work-order.update.dto";
export declare class WorkOrderService {
    private readonly workOrderRepo;
    private pusherService;
    private oneSignalNotificationService;
    constructor(workOrderRepo: Repository<WorkOrder>, pusherService: PusherService, oneSignalNotificationService: OneSignalNotificationService);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: {
            workOrderId: string;
            workOrderCode: string;
            dateTargetCompletion: string;
            title: string;
            description: string;
            status: string;
            active: boolean;
            type: string;
            burials: import("../db/entities/Burial").Burial[];
            assignedStaffUser: Users;
        }[];
        total: number;
    }>;
    getByCode(workOrderCode?: string): Promise<WorkOrder>;
    create(dto: CreateWorkOrderDto): Promise<WorkOrder>;
    update(workOrderCode: any, dto: UpdateWorkOrderDto): Promise<WorkOrder>;
    updateStatus(workOrderCode: any, dto: UpdateWorkOrderStatusDto): Promise<WorkOrder>;
    logNotification(users: Users[], data: WorkOrder, entityManager: EntityManager, title: string, description: string): Promise<string[]>;
    syncRealTime(userIds: string[], data: WorkOrder): Promise<void>;
}
