import { CreateReservationDto } from "src/core/dto/reservation/reservation.create.dto";
import { UpdateReservationDto, UpdateReservationStatusDto } from "src/core/dto/reservation/reservation.update.dto";
import { Reservation } from "src/db/entities/Reservation";
import { Users } from "src/db/entities/Users";
import { Repository, EntityManager } from "typeorm";
import { OneSignalNotificationService } from "./one-signal-notification.service";
import { Burial } from "src/db/entities/Burial";
import { Lot } from "src/db/entities/Lot";
import { PusherService } from "./pusher.service";
export declare class ReservationService {
    private readonly reservationRepo;
    private pusherService;
    private oneSignalNotificationService;
    constructor(reservationRepo: Repository<Reservation>, pusherService: PusherService, oneSignalNotificationService: OneSignalNotificationService);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: {
            reservationId: string;
            reservationCode: string;
            dateTime: Date;
            burialName: string;
            dateOfBirth: string;
            dateOfDeath: string;
            dateOfBurial: string;
            familyContactPerson: string;
            familyContactNumber: string;
            status: string;
            active: boolean;
            burials: Burial[];
            lot: Lot;
            user: Users;
        }[];
        total: number;
    }>;
    getByCode(reservationCode?: string): Promise<Reservation>;
    create(dto: CreateReservationDto): Promise<Reservation>;
    update(reservationCode: any, dto: UpdateReservationDto): Promise<Reservation>;
    updateStatus(reservationCode: any, dto: UpdateReservationStatusDto): Promise<Reservation>;
    logNotification(users: Users[], data: Reservation, entityManager: EntityManager, title: string, description: string): Promise<string[]>;
    syncRealTime(userIds: string[], data: Reservation): Promise<void>;
}
