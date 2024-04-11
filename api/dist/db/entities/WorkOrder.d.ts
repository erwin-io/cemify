import { Burial } from "./Burial";
import { Users } from "./Users";
export declare class WorkOrder {
    workOrderId: string;
    workOrderCode: string | null;
    dateTargetCompletion: string;
    title: string;
    description: string;
    status: string;
    active: boolean;
    type: string;
    burials: Burial[];
    assignedStaffUser: Users;
}
