import { Lot } from "./Lot";
import { Reservation } from "./Reservation";
import { WorkOrder } from "./WorkOrder";
export declare class Burial {
    burialId: string;
    burialCode: string | null;
    burialFullName: string;
    dateOfBirth: string;
    dateOfDeath: string;
    dateOfBurial: string;
    familyContactPerson: string;
    familyContactNumber: string;
    fromReservation: boolean;
    active: boolean;
    burialFirstName: string;
    burialMiddleName: string | null;
    burialLastName: string;
    burialAge: string;
    address: string;
    leasedDate: string;
    lot: Lot;
    reservation: Reservation;
    workOrder: WorkOrder;
}
