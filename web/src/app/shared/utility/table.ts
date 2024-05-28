export class ColumnDefinition {
  name: string;
  label: string;
  apiNotation?: string;
  sticky?: boolean;
  style?: ColumnStyle;
  controls?: boolean;
  disableSorting?: boolean;
  format?: {
    type: "currency" | "date" | "date-time" | "number" | "custom" | "image";
    custom: string;
  };
  hide?: boolean;
  type?: "string" | "boolean" | "date" | "number" = "string";
  filterOptions: ColumnDefinitionFilterOptions;
  urlPropertyName?: string;
  filter: any;
}

export class ColumnDefinitionFilterOptions {
  placeholder?: string;
  enable?: boolean;
  type?: "text" | "option" | "option-yes-no" | "date" | "date-range" | "number" | "number-range" | "precise";
};
export class ColumnStyle {
  width: string;
  left: string;
}

export class TableColumnBase {
  menu: any[] = [];
}

export class UsersTableColumn {
  userName: string;
  fullName: string;
  userType: string;
  mobileNumber: string;
  enable: boolean;
  userProfilePic?: string;
  url?: string;
}

export class UserTableColumn {
  userCode?: string;
  fullName?: string;
  mobileNumber?: string;
  userProfilePic?: string;
}

export class AccessTableColumn {
  accessId: string;
  accessCode: string;
  name?: string;
  url?: string;
}

export class ReservationTableColumn {
  reservationCode?: string;
  dateTime?: string;
  lotCode?: string;
  block?: string;
  dateOfBurial?: string;
  user?: string;
  status?: string;
  url?: string;
}

export class BurialTableColumn {
  burialCode?: string;
  burialFullName?: string;
  dateOfBurial?: string;
  dateOfBirth?: string;
  dateOfDeath?: string;
  lotCode?: string;
  block?: string;
  familyContactPerson?: string;
  familyContactNumber?: string;
  fromReservation: boolean;
  workOrder?: string;
  url?: string;
}

export class WorkOrderTableColumn {
  workOrderCode?: string;
  dateTargetCompletion?: string;
  type?: string;
  title?: string;
  description?: string;
  assignedStaffUser?: string;
  status?: string;
  url?: string;
}
