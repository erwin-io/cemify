import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { Users } from "src/db/entities/Users";
import { RegisterClientUserDto } from "src/core/dto/auth/register.dto";
import { NotificationsService } from "./notifications.service";
export declare class AuthService {
    private readonly userRepo;
    private readonly jwtService;
    private notificationService;
    constructor(userRepo: Repository<Users>, jwtService: JwtService, notificationService: NotificationsService);
    registerClient(dto: RegisterClientUserDto): Promise<Users>;
    getByCredentials({ userName, password }: {
        userName: any;
        password: any;
    }): Promise<Users>;
    getStaffByCredentials({ userName, password }: {
        userName: any;
        password: any;
    }): Promise<{
        totalUnreadNotif: number;
        userId: string;
        userName: string;
        password: string;
        fullName: string;
        mobileNumber: string;
        accessGranted: boolean;
        active: boolean;
        userCode: string;
        userType: string;
        gatewayConnectedUsers: import("../db/entities/GatewayConnectedUsers").GatewayConnectedUsers[];
        notifications: import("../db/entities/Notifications").Notifications[];
        reservations: import("../db/entities/Reservation").Reservation[];
        userOneSignalSubscriptions: import("../db/entities/UserOneSignalSubscription").UserOneSignalSubscription[];
        userProfilePic: import("../db/entities/UserProfilePic").UserProfilePic;
        access: import("../db/entities/Access").Access;
        workOrders: import("../db/entities/WorkOrder").WorkOrder[];
    }>;
    getClientByCredentials({ userName, password }: {
        userName: any;
        password: any;
    }): Promise<{
        totalUnreadNotif: number;
        userId: string;
        userName: string;
        password: string;
        fullName: string;
        mobileNumber: string;
        accessGranted: boolean;
        active: boolean;
        userCode: string;
        userType: string;
        gatewayConnectedUsers: import("../db/entities/GatewayConnectedUsers").GatewayConnectedUsers[];
        notifications: import("../db/entities/Notifications").Notifications[];
        reservations: import("../db/entities/Reservation").Reservation[];
        userOneSignalSubscriptions: import("../db/entities/UserOneSignalSubscription").UserOneSignalSubscription[];
        userProfilePic: import("../db/entities/UserProfilePic").UserProfilePic;
        access: import("../db/entities/Access").Access;
        workOrders: import("../db/entities/WorkOrder").WorkOrder[];
    }>;
}
