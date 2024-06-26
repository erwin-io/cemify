import { Burial } from "./burial.model";
import { Lot } from "./lot.model";
import { Users } from "./users";

export class Reservation {
  reservationId: string;
  reservationCode?: string;
  dateTime?: Date;
  burialFullName?: string;
  burialFirstName: string;
  burialMiddleName?: string;
  burialLastName: string;
  address: string;
  burialAge?: string;
  dateOfBirth?: string;
  dateOfDeath?: string;
  dateOfBurial?: string;
  familyContactPerson?: string;
  familyContactNumber?: string;
  status?: "PENDING" | "APPROVED" | "REJECTED" | "LEASED" | "CANCELLED";
  active?: boolean;
  burials?: Burial[];
  lot?: Lot;
  user?: Users;
}
