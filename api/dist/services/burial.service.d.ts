import { Burial } from "src/db/entities/Burial";
import { Users } from "src/db/entities/Users";
import { EntityManager, Repository } from "typeorm";
import { PusherService } from "./pusher.service";
import { OneSignalNotificationService } from "./one-signal-notification.service";
import { CreateBurialDto, CreateBurialFromReservationDto } from "src/core/dto/burial/burial.create.dto";
import { UpdateBurialDto } from "src/core/dto/burial/burial.update.dto";
import { WorkOrder } from "src/db/entities/WorkOrder";
export declare class BurialService {
    private readonly burialRepo;
    private pusherService;
    private oneSignalNotificationService;
    constructor(burialRepo: Repository<Burial>, pusherService: PusherService, oneSignalNotificationService: OneSignalNotificationService);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Burial[];
        total: number;
    }>;
    getByCode(burialCode: any): Promise<Burial>;
    getAllByClientUserCode(userCode: any): Promise<any[]>;
    create(dto: CreateBurialDto): Promise<Burial>;
    createFromReservation(dto: CreateBurialFromReservationDto): Promise<Burial>;
    update(burialCode: any, dto: UpdateBurialDto): Promise<Burial>;
    logNotification(users: Users[], type: "RESERVATION" | "WORK_ORDER", data: Burial | WorkOrder, entityManager: EntityManager, title: string, description: string): Promise<string[]>;
    syncRealTime(userIds: string[], data: Burial): Promise<void>;
}
