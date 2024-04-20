import { Burial } from './burial.model';
import { Users } from './users';

export class WorkOrder {
  workOrderId: string;
  workOrderCode?: string;
  dateTargetCompletion?: string;
  type?: 'BURIAL' | 'MAINTENANCE';
  title?: string;
  description?: string;
  status?: 'PENDING' | 'CANCELLED' | 'COMPLETED' | 'INPROGRESS';
  active?: boolean;
  burials?: Burial[];
  assignedStaffUser?: Users;
}
