import { Lot } from './lot.model';
import { Reservation } from './reservation.model';
import { WorkOrder } from './work-order.model';

export class Burial {
  burialId: string;
  burialCode?: string;
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
  fromReservation?: boolean;
  active?: boolean;
  lot?: Lot;
  reservation?: Reservation;
  workOrder: WorkOrder;
}
