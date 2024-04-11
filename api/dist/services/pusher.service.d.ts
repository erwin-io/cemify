import { ConfigService } from "@nestjs/config";
export declare class PusherService {
    private readonly config;
    pusher: any;
    constructor(config: ConfigService);
    trigger(channel: any, event: any, data: any): void;
    reSync(type: string, data: any): Promise<void>;
    reservationChanges(userIds: string[], data: any): Promise<void>;
    burialChanges(userIds: string[], data: any): Promise<void>;
    workOrderChanges(userIds: string[], data: any): Promise<void>;
    sendNotif(userIds: string[], title: string, description: any): Promise<void>;
}
