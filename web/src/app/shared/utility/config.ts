import { AccessPages } from "src/app/model/access.model";
import { ColumnDefinition } from "./table"

export interface AppConfig {
    appName: string;
    reservationConfig: {
      maxCancellation: string;
      daysCancellationLimitReset: string;
      timeSlotHours: {
        start: string;
        end: string;
      };
      timeSlotNotAvailableHours: string[];
      dayOfWeekNotAvailable: string[];
    };
    tableColumns: {
      users: ColumnDefinition[];
      access: ColumnDefinition[];
      reservation: ColumnDefinition[];
      burial: ColumnDefinition[];
    };
    sessionConfig: {
      sessionTimeout: string;
    };
    lookup: {
      accessPages: AccessPages[];
    };
    apiEndPoints: {
      auth: {
        login: string;
        registerTenant: string;
      };
      user: {
        getByCode: string;
        createUsers: string;
        updateProfile: string;
        updateUsers: string;
        getUsersByAdvanceSearch: string;
        resetUserPassword: string;
        approveAccessRequest: string;
      };
      access: {
        getByAdvanceSearch: string;
        getByCode: string;
        create: string;
        update: string;
        delete: string;
      };
      burial: {
        getByAdvanceSearch: string;
        getAllByClientUserCode: string;
        getByCode: string;
        searchMap: string;
        create: string;
        createFromReservation: string;
        update: string;
        delete: string;
      };
      reservation: {
        getByAdvanceSearch: string;
        getByCode: string;
        create: string;
        update: string;
        updateStatus: string;
      },
      lot: {
        getByAdvanceSearch: string;
        getByCode: string;
        getByBlock: string;
        updateMapData: string;
      },
      notifications: {
        getByAdvanceSearch: string;
        getUnreadByUser: string;
        marAsRead: string;
      };
      dashboard: {};
      message: { create: string };
    };
  }