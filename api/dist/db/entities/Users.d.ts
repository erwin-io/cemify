import { GatewayConnectedUsers } from "./GatewayConnectedUsers";
import { Notifications } from "./Notifications";
import { Reservation } from "./Reservation";
import { UserOneSignalSubscription } from "./UserOneSignalSubscription";
import { UserProfilePic } from "./UserProfilePic";
import { Access } from "./Access";
import { WorkOrder } from "./WorkOrder";
export declare class Users {
    userId: string;
    userName: string;
    password: string;
    fullName: string;
    mobileNumber: string;
    accessGranted: boolean;
    active: boolean;
    userCode: string | null;
    userType: string;
    gatewayConnectedUsers: GatewayConnectedUsers[];
    notifications: Notifications[];
    reservations: Reservation[];
    userOneSignalSubscriptions: UserOneSignalSubscription[];
    userProfilePic: UserProfilePic;
    access: Access;
    workOrders: WorkOrder[];
}
