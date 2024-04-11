import { DefaultReservationDto } from "./work-order-base.dto";
export declare class CreateReservationDto extends DefaultReservationDto {
    userCode: string;
    lotCode: string;
}
