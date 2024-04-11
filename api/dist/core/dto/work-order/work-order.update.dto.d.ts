import { DefaultWorkOrderDto } from "./work-order-base.dto";
export declare class UpdateWorkOrderDto extends DefaultWorkOrderDto {
}
export declare class UpdateWorkOrderStatusDto {
    status: "COMPLETED" | "INPROGRESS" | "CANCELLED";
}
