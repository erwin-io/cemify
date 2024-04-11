"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment_1 = __importDefault(require("moment"));
const date_constant_1 = require("../common/constant/date.constant");
const notifications_constant_1 = require("../common/constant/notifications.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const user_type_constant_1 = require("../common/constant/user-type.constant");
const work_order_constant_1 = require("../common/constant/work-order.constant");
const utils_1 = require("../common/utils/utils");
const Notifications_1 = require("../db/entities/Notifications");
const Users_1 = require("../db/entities/Users");
const WorkOrder_1 = require("../db/entities/WorkOrder");
const typeorm_2 = require("typeorm");
const one_signal_notification_service_1 = require("./one-signal-notification.service");
const pusher_service_1 = require("./pusher.service");
let WorkOrderService = class WorkOrderService {
    constructor(workOrderRepo, pusherService, oneSignalNotificationService) {
        this.workOrderRepo = workOrderRepo;
        this.pusherService = pusherService;
        this.oneSignalNotificationService = oneSignalNotificationService;
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.workOrderRepo.find({
                where: Object.assign({}, condition),
                skip,
                take,
                order,
                relations: {
                    assignedStaffUser: {
                        userProfilePic: {
                            file: true,
                        },
                    },
                },
            }),
            this.workOrderRepo.count({
                where: Object.assign({}, condition),
            }),
        ]);
        return {
            results: results.map((res) => {
                var _a;
                delete res.burials;
                (_a = res.assignedStaffUser) === null || _a === void 0 ? true : delete _a.password;
                return Object.assign({}, res);
            }),
            total,
        };
    }
    async getByCode(workOrderCode = "") {
        var _a, _b;
        const result = await this.workOrderRepo.findOne({
            where: {
                workOrderCode: (_a = workOrderCode === null || workOrderCode === void 0 ? void 0 : workOrderCode.toString()) === null || _a === void 0 ? void 0 : _a.toLowerCase(),
            },
            relations: {
                burials: {
                    lot: true,
                },
                assignedStaffUser: {
                    userProfilePic: {
                        file: true,
                    },
                },
            },
        });
        if (!result) {
            throw Error(work_order_constant_1.WORK_ORDER_ERROR_NOT_FOUND);
        }
        (_b = result.assignedStaffUser) === null || _b === void 0 ? true : delete _b.password;
        return result;
    }
    async create(dto) {
        return await this.workOrderRepo.manager.transaction(async (entityManager) => {
            var _a;
            let workOrder = new WorkOrder_1.WorkOrder();
            workOrder.title = dto.title;
            workOrder.description = dto.description;
            const dateTargetCompletion = (0, moment_1.default)(new Date(dto.dateTargetCompletion), date_constant_1.DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD");
            workOrder.dateTargetCompletion = dateTargetCompletion;
            const assignedStaffUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userCode: dto.assignedStaffUserCode,
                    userType: user_type_constant_1.USER_TYPE.STAFF,
                    active: true,
                },
            });
            if (!assignedStaffUser) {
                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
            }
            workOrder.assignedStaffUser = assignedStaffUser;
            workOrder.status = work_order_constant_1.WORK_ORDER_STATUS.PENDING;
            workOrder.type = work_order_constant_1.WORK_ORDER_TYPE.MAINTENANCE;
            workOrder = await entityManager.save(workOrder);
            workOrder.workOrderCode = (0, utils_1.generateIndentityCode)(workOrder.workOrderId);
            workOrder = await entityManager.save(workOrder);
            workOrder = await entityManager.findOne(WorkOrder_1.WorkOrder, {
                where: {
                    workOrderCode: workOrder.workOrderCode,
                },
                relations: {
                    assignedStaffUser: {
                        userProfilePic: {
                            file: true,
                        },
                    },
                },
            });
            (_a = workOrder === null || workOrder === void 0 ? void 0 : workOrder.assignedStaffUser) === null || _a === void 0 ? true : delete _a.password;
            return workOrder;
        });
    }
    async update(workOrderCode, dto) {
        return await this.workOrderRepo.manager.transaction(async (entityManager) => {
            var _a;
            let workOrder = await entityManager.findOne(WorkOrder_1.WorkOrder, {
                where: {
                    workOrderCode,
                },
                relations: {
                    assignedStaffUser: {
                        userProfilePic: {
                            file: true,
                        },
                    },
                },
            });
            if (!workOrder) {
                throw Error(work_order_constant_1.WORK_ORDER_ERROR_NOT_FOUND);
            }
            if (workOrder.status !== work_order_constant_1.WORK_ORDER_STATUS.PENDING) {
                throw Error("The booking was already: " + workOrder.status.toLocaleLowerCase());
            }
            workOrder.title = dto.title;
            workOrder.description = dto.description;
            const dateTargetCompletion = (0, moment_1.default)(new Date(dto.dateTargetCompletion), date_constant_1.DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD");
            workOrder.dateTargetCompletion = dateTargetCompletion;
            const assignedStaffUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userCode: dto.assignedStaffUserCode,
                    userType: user_type_constant_1.USER_TYPE.STAFF,
                    active: true,
                },
            });
            if (!assignedStaffUser) {
                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
            }
            workOrder.assignedStaffUser = assignedStaffUser;
            workOrder = await entityManager.save(WorkOrder_1.WorkOrder, workOrder);
            workOrder = await entityManager.findOne(WorkOrder_1.WorkOrder, {
                where: {
                    workOrderCode: workOrder.workOrderCode,
                },
                relations: {
                    assignedStaffUser: {
                        userProfilePic: {
                            file: true,
                        },
                    },
                },
            });
            (_a = workOrder === null || workOrder === void 0 ? void 0 : workOrder.assignedStaffUser) === null || _a === void 0 ? true : delete _a.password;
            return workOrder;
        });
    }
    async updateStatus(workOrderCode, dto) {
        return await this.workOrderRepo.manager.transaction(async (entityManager) => {
            var _a;
            let workOrder = await entityManager.findOne(WorkOrder_1.WorkOrder, {
                where: {
                    workOrderCode,
                },
                relations: {
                    assignedStaffUser: {
                        userProfilePic: {
                            file: true,
                        },
                    },
                },
            });
            if (!workOrder) {
                throw Error(work_order_constant_1.WORK_ORDER_ERROR_NOT_FOUND);
            }
            if (workOrder.status === work_order_constant_1.WORK_ORDER_STATUS.CANCELLED ||
                workOrder.status === work_order_constant_1.WORK_ORDER_STATUS.COMPLETED) {
                throw Error("The work order was already: " +
                    workOrder.status.toLocaleLowerCase());
            }
            else if (dto.status !== "COMPLETED" &&
                workOrder.status === work_order_constant_1.WORK_ORDER_STATUS.INPROGRESS) {
                throw Error("The work order was already: " +
                    workOrder.status.toLocaleLowerCase());
            }
            workOrder.status = dto.status;
            const status = workOrder.status;
            if (status === work_order_constant_1.WORK_ORDER_STATUS.CANCELLED) {
                const title = notifications_constant_1.NOTIF_TITLE.WORK_ORDER_CANCELLED;
                const desc = `Your work order for #${workOrder.workOrderCode} ${workOrder.title} was cancelled`;
                const notificationIds = await this.logNotification([workOrder.assignedStaffUser], workOrder, entityManager, title, desc);
                await this.syncRealTime([workOrder.assignedStaffUser.userId], workOrder);
                const pushNotifResults = await Promise.all([
                    this.oneSignalNotificationService.sendToExternalUser(workOrder.assignedStaffUser.userName, "WORK_ORDER", workOrder.workOrderCode, notificationIds, title, desc),
                ]);
                console.log("Push notif results ", JSON.stringify(pushNotifResults));
            }
            workOrder = await entityManager.save(WorkOrder_1.WorkOrder, workOrder);
            workOrder = await entityManager.findOne(WorkOrder_1.WorkOrder, {
                where: {
                    workOrderCode: workOrder.workOrderCode,
                },
                relations: {
                    assignedStaffUser: {
                        userProfilePic: {
                            file: true,
                        },
                    },
                },
            });
            (_a = workOrder === null || workOrder === void 0 ? void 0 : workOrder.assignedStaffUser) === null || _a === void 0 ? true : delete _a.password;
            return workOrder;
        });
    }
    async logNotification(users, data, entityManager, title, description) {
        const notifications = [];
        for (const user of users) {
            notifications.push({
                title,
                description,
                type: notifications_constant_1.NOTIF_TYPE.WORK_ORDER.toString(),
                referenceId: data.workOrderCode.toString(),
                isRead: false,
                user: user,
            });
        }
        const res = await entityManager.save(Notifications_1.Notifications, notifications);
        const notificationsIds = res.map((x) => x.notificationId);
        await this.pusherService.sendNotif(users.map((x) => x.userId), title, description);
        return notificationsIds;
    }
    async syncRealTime(userIds, data) {
        await this.pusherService.workOrderChanges(userIds, data);
    }
};
WorkOrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(WorkOrder_1.WorkOrder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        pusher_service_1.PusherService,
        one_signal_notification_service_1.OneSignalNotificationService])
], WorkOrderService);
exports.WorkOrderService = WorkOrderService;
//# sourceMappingURL=work-order.service.js.map