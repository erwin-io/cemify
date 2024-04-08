import { DefaultReservationDto } from "./reservation-base.dto";
export declare class UpdateReservationDto extends DefaultReservationDto {
}
export declare class UpdateReservationStatusDto {
    status: "REJECTED" | "APPROVED" | "LEASED" | "CANCELLED";
}
