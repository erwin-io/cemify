import { Burial } from "src/db/entities/Burial";
import { Lot } from "src/db/entities/Lot";
import { Reservation } from "src/db/entities/Reservation";
import { Users } from "src/db/entities/Users";
import { Repository } from "typeorm";
export declare class DashboardService {
    private readonly lotRepo;
    private readonly reservationRepo;
    private readonly burialRepo;
    private readonly usersRepo;
    constructor(lotRepo: Repository<Lot>, reservationRepo: Repository<Reservation>, burialRepo: Repository<Burial>, usersRepo: Repository<Users>);
    getUsers(): Promise<{
        totalClient: number;
        totalAdmin: number;
        totalStaff: number;
    }>;
    getBurialAndReservationRecords(): Promise<{
        totalRecords: number;
        totalPending: number;
        totalForLeased: number;
    }>;
    getLot(): Promise<{
        totalAvailable: number;
        totalOccupied: number;
        totalUnavailable: number;
    }>;
    getLotTrackerByBlock(): Promise<{
        a: any;
        b: any;
        c: any;
        d: any;
        e: any;
    }>;
    getAnnualBurialReport(yearFrom: any, yeartTo: any): Promise<Burial[]>;
}
