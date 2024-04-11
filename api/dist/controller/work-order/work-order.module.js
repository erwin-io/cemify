"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrderModule = void 0;
const common_1 = require("@nestjs/common");
const work_order_controller_1 = require("./work-order.controller");
const WorkOrder_1 = require("../../db/entities/WorkOrder");
const work_order_service_1 = require("../../services/work-order.service");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("@nestjs/axios");
const firebase_provider_module_1 = require("../../core/provider/firebase/firebase-provider.module");
const one_signal_notification_service_1 = require("../../services/one-signal-notification.service");
const pusher_service_1 = require("../../services/pusher.service");
let WorkOrderModule = class WorkOrderModule {
};
WorkOrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            firebase_provider_module_1.FirebaseProviderModule,
            axios_1.HttpModule,
            typeorm_1.TypeOrmModule.forFeature([WorkOrder_1.WorkOrder]),
        ],
        controllers: [work_order_controller_1.WorkOrderController],
        providers: [work_order_service_1.WorkOrderService, pusher_service_1.PusherService, one_signal_notification_service_1.OneSignalNotificationService],
        exports: [work_order_service_1.WorkOrderService, pusher_service_1.PusherService, one_signal_notification_service_1.OneSignalNotificationService],
    })
], WorkOrderModule);
exports.WorkOrderModule = WorkOrderModule;
//# sourceMappingURL=work-order.module.js.map