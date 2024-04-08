import { Burial } from "./Burial";
import { Lot } from "./Lot";
import { Users } from "./Users";
export declare class Reservation {
    reservationId: string;
    reservationCode: string | null;
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
}
