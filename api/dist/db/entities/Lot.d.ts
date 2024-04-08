import { Burial } from "./Burial";
import { Reservation } from "./Reservation";
export declare class Lot {
    lotId: string;
    lotCode: string;
    block: string;
    level: string;
    mapData: object;
    status: string;
    burials: Burial[];
    reservations: Reservation[];
}
