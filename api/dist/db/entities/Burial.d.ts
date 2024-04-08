import { Lot } from "./Lot";
import { Reservation } from "./Reservation";
import { WorkOrder } from "./WorkOrder";
export declare class Burial {
    burialId: string;
    burialCode: string | null;
    fullName: string;
    dateOfBirth: string;
    dateOfDeath: string;
    dateOfBurial: string;
    familyContactPerson: string;
    familyContactNumber: string;
    fromReservation: boolean;
    active: boolean;
    lot: Lot;
    reservation: Reservation;
    workOrder: WorkOrder;
}
