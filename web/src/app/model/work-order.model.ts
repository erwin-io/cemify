import { Burial } from "./burial.model";
import { Users } from "./users";

export class WorkOrder {
  siteActivityId: string;
  siteActivityCode?: string;
  dateTargetCompletion?: string;
  title?: string;
  description?: string;
  status?: string;
  active?: boolean;
  burials?: Burial[];
  assignedStaffUser?: Users;
}
