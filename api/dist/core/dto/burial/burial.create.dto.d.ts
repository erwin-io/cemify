import { DefaultBurialDto } from "./burial-base.dto";
export declare class CreateBurialDto extends DefaultBurialDto {
    lotCode: string;
}
export declare class CreateBurialFromReservationDto {
    reservationCode: string;
    assignedStaffUserId: string;
}
