import { DefaultReservationDto } from "./reservation-base.dto";
export declare class CreateReservationDto extends DefaultReservationDto {
    userCode: string;
    lotCode: string;
}
