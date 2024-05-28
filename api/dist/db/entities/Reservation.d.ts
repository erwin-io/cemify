import { Burial } from "./Burial";
import { Lot } from "./Lot";
import { Users } from "./Users";
export declare class Reservation {
    reservationId: string;
    reservationCode: string | null;
    dateTime: Date;
    burialFullName: string;
    dateOfBirth: string;
    dateOfDeath: string;
    dateOfBurial: string;
    familyContactPerson: string;
    familyContactNumber: string;
    status: string;
    active: boolean;
    burialFirstName: string;
    burialMiddleName: string | null;
    burialLastName: string;
    address: string;
    burialAge: string;
    burials: Burial[];
    lot: Lot;
    user: Users;
}
