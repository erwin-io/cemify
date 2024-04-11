import { DefaultReservationDto } from "./work-order-base.dto";
export declare class UpdateReservationDto extends DefaultReservationDto {
}
export declare class UpdateReservationStatusDto {
    status: "REJECTED" | "APPROVED" | "LEASED" | "CANCELLED";
}
