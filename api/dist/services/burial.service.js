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
exports.BurialService = void 0;
const Notifications_1 = require("../db/entities/Notifications");
const Reservation_1 = require("../db/entities/Reservation");
const Burial_1 = require("../db/entities/Burial");
const Users_1 = require("../db/entities/Users");
const typeorm_1 = require("typeorm");
const pusher_service_1 = require("./pusher.service");
const one_signal_notification_service_1 = require("./one-signal-notification.service");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const moment_1 = __importDefault(require("moment"));
const date_constant_1 = require("../common/constant/date.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const user_type_constant_1 = require("../common/constant/user-type.constant");
const utils_1 = require("../common/utils/utils");
const burial_constant_1 = require("../common/constant/burial.constant");
const reservation_constant_1 = require("../common/constant/reservation.constant");
const lot_constant_1 = require("../common/constant/lot.constant");
const Lot_1 = require("../db/entities/Lot");
const WorkOrder_1 = require("../db/entities/WorkOrder");
const work_order_constant_1 = require("../common/constant/work-order.constant");
let BurialService = class BurialService {
    constructor(burialRepo, pusherService, oneSignalNotificationService) {
        this.burialRepo = burialRepo;
        this.pusherService = pusherService;
        this.oneSignalNotificationService = oneSignalNotificationService;
    }
    async searchMap(key) {
        const [burial, lot] = await Promise.all([
            this.burialRepo.manager.query(`
      select 
      b."BurialId" as "burialId", 
      b."BurialCode" as "burialCode", 
      b."BurialFullName" as "burialFullName",
      b."BurialFirstName" as "burialFirstName",
      b."BurialMiddleName" as "burialMiddleName", 
      b."BurialLastName" as "burialLastName", 
      b."BurialAge" as "burialAge", 
      b."Address" as "address", 
      b."DateOfBirth" as "dateOfBirth", 
      b."DateOfDeath" as "dateOfDeath", 
      b."DateOfBurial" as "dateOfBurial", 
      b."FamilyContactPerson" as "familyContactPerson", 
      b."FamilyContactNumber" as "familyContactNumber", 
      b."FromReservation" as "fromReservation", 
      b."Active" as "burialId", 
      b."LotId" as "lotId",  
      l."LotCode" as "lotCode",  
      l."Block" as "block",  
      l."Level" as "level",  
      l."MapData" as "mapData",  
      l."Status" as "status" FROM dbo."Burial" b
    left join dbo."Lot" l ON b."LotId" = l."LotId"
    where LOWER(b."FullName") like '%${key.toLowerCase()}%' and b."Active" = true 
      `),
            this.burialRepo.manager.query(`
      select 
      "LotId" as "lotId",  
      "LotCode" as "lotCode",  
      "Block" as "block",  
      "Level" as "level",  
      "MapData" as "mapData",  
      "Status" as "status" FROM dbo."Lot" where LOWER("LotCode") like '%${key.toLowerCase()}%' `),
        ]);
        return {
            burial: burial.map((res) => {
                return {
                    burialId: res.burialId,
                    burialCode: res.burialCode,
                    burialFullName: res.burialFullName,
                    burialFirstName: res.burialFirstName,
                    burialMiddleName: res.burialMiddleName,
                    burialLastName: res.burialLastName,
                    burialAge: res.burialAge,
                    address: res.address,
                    dateOfBirth: res.dateOfBirth,
                    dateOfDeath: res.dateOfDeath,
                    dateOfBurial: res.dateOfBurial,
                    familyContactPerson: res.familyContactPerson,
                    familyContactNumber: res.familyContactNumber,
                    fromReservation: res.fromReservation,
                    active: res.active,
                    lot: {
                        lotId: res.lotId,
                        lotCode: res.lotCode,
                        block: res.block,
                        level: res.level,
                        mapData: res.mapData,
                        status: res.status,
                    },
                };
            }),
            lot: lot,
        };
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.burialRepo.find({
                where: condition,
                relations: {
                    lot: true,
                    reservation: {
                        user: {
                            userProfilePic: true,
                        },
                    },
                    workOrder: {
                        assignedStaffUser: {
                            userProfilePic: true,
                        },
                    },
                },
                skip,
                take,
                order,
            }),
            this.burialRepo.count({
                where: condition,
            }),
        ]);
        return {
            results: results.map((x) => {
                var _a;
                (_a = x === null || x === void 0 ? void 0 : x.reservation) === null || _a === void 0 ? true : delete _a.user.password;
                return x;
            }),
            total,
        };
    }
    async getByCode(burialCode) {
        var _a;
        const result = await this.burialRepo.findOne({
            where: {
                burialCode,
            },
            relations: {
                lot: true,
                reservation: {
                    user: {
                        userProfilePic: true,
                    },
                },
                workOrder: {
                    assignedStaffUser: {
                        userProfilePic: true,
                    },
                },
            },
        });
        if (!result) {
            throw Error(burial_constant_1.BURIAL_ERROR_NOT_FOUND);
        }
        (_a = result === null || result === void 0 ? void 0 : result.reservation) === null || _a === void 0 ? true : delete _a.user.password;
        return result;
    }
    async getAllByClientUserCode(userCode) {
        const result = await this.burialRepo.find({
            where: {
                reservation: {
                    user: userCode,
                    status: reservation_constant_1.RESERVATION_STATUS.LEASED,
                },
            },
            relations: {
                lot: true,
                reservation: {
                    user: {
                        userProfilePic: {
                            file: true,
                        },
                    },
                },
            },
            order: {
                dateOfBirth: "ASC",
            },
        });
        const contract = result.map((x) => {
            var _a;
            (_a = x === null || x === void 0 ? void 0 : x.reservation) === null || _a === void 0 ? true : delete _a.user.password;
            return x;
        });
        return contract;
    }
    async create(dto) {
        return await this.burialRepo.manager.transaction(async (entityManager) => {
            var _a, _b, _c, _d, _e, _f, _g;
            let lot = await entityManager.findOne(Lot_1.Lot, {
                where: {
                    lotCode: dto.lotCode,
                },
            });
            if (!lot) {
                throw Error(lot_constant_1.LOT_ERROR_NOT_FOUND);
            }
            if (lot && lot.status === lot_constant_1.LOT_STATUS.OCCUPIED) {
                throw Error(lot_constant_1.LOT_ERROR_OCCUPIED);
            }
            if (lot && lot.status === lot_constant_1.LOT_STATUS.UNAVAILABLE) {
                throw Error(lot_constant_1.LOT_ERROR_NOT_AVAILABLE);
            }
            let burial = new Burial_1.Burial();
            burial.burialFullName = (0, utils_1.getFullName)((_a = dto.burialFirstName) !== null && _a !== void 0 ? _a : "", (_b = dto.burialMiddleName) !== null && _b !== void 0 ? _b : "", (_c = dto.burialLastName) !== null && _c !== void 0 ? _c : "");
            burial.burialFirstName = dto.burialFirstName;
            burial.burialMiddleName = dto.burialMiddleName;
            burial.burialLastName = dto.burialLastName;
            burial.burialAge = dto.burialAge;
            burial.address = dto.address;
            const dateOfBirth = (0, moment_1.default)(new Date(dto.dateOfBirth), date_constant_1.DateConstant.DATE_LANGUAGE).format();
            burial.dateOfBirth = dateOfBirth;
            const dateOfDeath = (0, moment_1.default)(new Date(dto.dateOfDeath), date_constant_1.DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD");
            burial.dateOfDeath = dateOfDeath;
            const dateOfBurial = (0, moment_1.default)(new Date(dto.dateOfBurial), date_constant_1.DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD");
            burial.dateOfBurial = dateOfBurial;
            burial.familyContactPerson = dto.familyContactPerson;
            burial.familyContactNumber = dto.familyContactNumber;
            burial.fromReservation = false;
            burial.lot = lot;
            let workOrder = new WorkOrder_1.WorkOrder();
            workOrder.type = work_order_constant_1.WORK_ORDER_TYPE.BURIAL;
            workOrder.dateTargetCompletion = dateOfBurial;
            workOrder.title = `Burial work order on ${(0, moment_1.default)(dateOfBurial).format("MMM DD, YYYY")}`;
            workOrder.description =
                "Date of Burial: " + (0, moment_1.default)(dateOfBurial).format("MMM DD, YYYY") + "\n";
            "Location\n" +
                "Block: " +
                lot.block +
                " \n" +
                "Lot: " +
                lot.lotCode +
                " \n";
            const assignedStaffUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userId: dto.assignedStaffUserId,
                    userType: user_type_constant_1.USER_TYPE.STAFF,
                },
            });
            workOrder.assignedStaffUser = assignedStaffUser;
            workOrder = await entityManager.save(WorkOrder_1.WorkOrder, workOrder);
            workOrder.workOrderCode = (0, utils_1.generateIndentityCode)(workOrder.workOrderId);
            workOrder = await entityManager.save(WorkOrder_1.WorkOrder, workOrder);
            burial.workOrder = workOrder;
            burial = await entityManager.save(Burial_1.Burial, burial);
            burial.burialCode = (0, utils_1.generateIndentityCode)(burial.burialId);
            burial = await entityManager.save(Burial_1.Burial, burial);
            const workOrderNotifTitle = `New Burial work order assigned to you!`;
            const workOrderNotifDesc = `Burial work order on ${(0, moment_1.default)(dateOfBurial).format("MMM DD, YYYY")} at block ${lot.block}, lot ${lot.lotCode}`;
            const staffNotificationIds = await this.logNotification([assignedStaffUser], "WORK_ORDER", workOrder, entityManager, workOrderNotifTitle, workOrderNotifDesc);
            await this.syncRealTime([assignedStaffUser.userId], burial);
            const pushNotifResults = await Promise.all([
                this.oneSignalNotificationService.sendToExternalUser(assignedStaffUser.userName, "WORK_ORDER", burial.burialCode, staffNotificationIds, workOrderNotifTitle, workOrderNotifDesc),
            ]);
            console.log("Push notif results ", JSON.stringify(pushNotifResults));
            lot.status = lot_constant_1.LOT_STATUS.OCCUPIED;
            lot = await entityManager.save(Lot_1.Lot, lot);
            burial = await entityManager.findOne(Burial_1.Burial, {
                where: {
                    burialCode: burial.burialCode,
                },
                relations: {
                    lot: true,
                    reservation: {
                        user: {
                            userProfilePic: {
                                file: true,
                            },
                        },
                    },
                    workOrder: {
                        assignedStaffUser: true,
                    },
                },
            });
            (_e = (_d = burial === null || burial === void 0 ? void 0 : burial.workOrder) === null || _d === void 0 ? void 0 : _d.assignedStaffUser) === null || _e === void 0 ? true : delete _e.password;
            (_g = (_f = burial === null || burial === void 0 ? void 0 : burial.reservation) === null || _f === void 0 ? void 0 : _f.user) === null || _g === void 0 ? true : delete _g.password;
            return burial;
        });
    }
    async createFromReservation(dto) {
        return await this.burialRepo.manager.transaction(async (entityManager) => {
            var _a, _b, _c, _d, _e, _f, _g;
            let reservation = await entityManager.findOne(Reservation_1.Reservation, {
                where: {
                    reservationCode: dto.reservationCode,
                },
                relations: {
                    lot: true,
                },
            });
            if (!reservation) {
                throw Error(reservation_constant_1.RESERVATION_ERROR_NOT_FOUND);
            }
            if (!reservation.lot) {
                throw Error(lot_constant_1.LOT_ERROR_NOT_FOUND);
            }
            if (reservation.lot && reservation.lot.status === lot_constant_1.LOT_STATUS.OCCUPIED) {
                throw Error(lot_constant_1.LOT_ERROR_OCCUPIED);
            }
            if (reservation.lot &&
                reservation.lot.status === lot_constant_1.LOT_STATUS.UNAVAILABLE) {
                throw Error(lot_constant_1.LOT_ERROR_NOT_AVAILABLE);
            }
            let burial = new Burial_1.Burial();
            burial.burialFullName = (0, utils_1.getFullName)((_a = reservation.burialFirstName) !== null && _a !== void 0 ? _a : "", (_b = reservation.burialMiddleName) !== null && _b !== void 0 ? _b : "", (_c = reservation.burialLastName) !== null && _c !== void 0 ? _c : "");
            burial.burialFirstName = reservation.burialFirstName;
            burial.burialMiddleName = reservation.burialMiddleName;
            burial.burialLastName = reservation.burialLastName;
            burial.burialAge = reservation.burialAge;
            burial.address = reservation.address;
            const dateOfBirth = (0, moment_1.default)(new Date(reservation.dateOfBirth), date_constant_1.DateConstant.DATE_LANGUAGE).format();
            burial.dateOfBirth = dateOfBirth;
            const dateOfDeath = (0, moment_1.default)(new Date(reservation.dateOfDeath), date_constant_1.DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD");
            burial.dateOfDeath = dateOfDeath;
            const dateOfBurial = (0, moment_1.default)(new Date(reservation.dateOfBurial), date_constant_1.DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD");
            burial.dateOfBurial = dateOfBurial;
            burial.familyContactPerson = reservation.familyContactPerson;
            burial.familyContactNumber = reservation.familyContactNumber;
            burial.fromReservation = true;
            burial.reservation = reservation;
            reservation.status = reservation_constant_1.RESERVATION_STATUS.LEASED;
            reservation = await entityManager.save(Reservation_1.Reservation, reservation);
            burial.lot = reservation.lot;
            let workOrder = new WorkOrder_1.WorkOrder();
            workOrder.type = work_order_constant_1.WORK_ORDER_TYPE.BURIAL;
            workOrder.dateTargetCompletion = dateOfBurial;
            workOrder.title = `Burial work order on ${(0, moment_1.default)(dateOfBurial).format("MMM DD, YYYY")}`;
            workOrder.description =
                "Date of Burial: " + (0, moment_1.default)(dateOfBurial).format("MMM DD, YYYY") + "\n";
            "Location\n" +
                "Block: " +
                reservation.lot.block +
                " \n" +
                "Lot: " +
                reservation.lot.lotCode +
                " \n";
            const assignedStaffUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userId: dto.assignedStaffUserId,
                    userType: user_type_constant_1.USER_TYPE.STAFF,
                },
            });
            workOrder.assignedStaffUser = assignedStaffUser;
            workOrder = await entityManager.save(WorkOrder_1.WorkOrder, workOrder);
            workOrder.workOrderCode = (0, utils_1.generateIndentityCode)(workOrder.workOrderId);
            workOrder = await entityManager.save(WorkOrder_1.WorkOrder, workOrder);
            burial.workOrder = workOrder;
            burial = await entityManager.save(Burial_1.Burial, burial);
            burial.burialCode = (0, utils_1.generateIndentityCode)(burial.burialId);
            burial = await entityManager.save(Burial_1.Burial, burial);
            const workOrderNotifTitle = `New Burial work order assigned to you!`;
            const workOrderNotifDesc = `Burial work order on ${(0, moment_1.default)(dateOfBurial).format("MMM DD, YYYY")} at block ${reservation.lot.block}, lot ${reservation.lot.lotCode}`;
            const staffNotificationIds = await this.logNotification([assignedStaffUser], "WORK_ORDER", workOrder, entityManager, workOrderNotifTitle, workOrderNotifDesc);
            await this.syncRealTime([assignedStaffUser.userId], burial);
            const pushNotifResults = await Promise.all([
                this.oneSignalNotificationService.sendToExternalUser(assignedStaffUser.userName, "WORK_ORDER", burial.burialCode, staffNotificationIds, workOrderNotifTitle, workOrderNotifDesc),
            ]);
            console.log("Push notif results ", JSON.stringify(pushNotifResults));
            reservation.lot.status = lot_constant_1.LOT_STATUS.OCCUPIED;
            reservation.lot = await entityManager.save(Lot_1.Lot, reservation.lot);
            burial = await entityManager.findOne(Burial_1.Burial, {
                where: {
                    burialCode: burial.burialCode,
                },
                relations: {
                    lot: true,
                    reservation: {
                        user: {
                            userProfilePic: {
                                file: true,
                            },
                        },
                    },
                    workOrder: {
                        assignedStaffUser: {
                            userProfilePic: true,
                        },
                    },
                },
            });
            (_e = (_d = burial === null || burial === void 0 ? void 0 : burial.workOrder) === null || _d === void 0 ? void 0 : _d.assignedStaffUser) === null || _e === void 0 ? true : delete _e.password;
            (_g = (_f = burial === null || burial === void 0 ? void 0 : burial.reservation) === null || _f === void 0 ? void 0 : _f.user) === null || _g === void 0 ? true : delete _g.password;
            return burial;
        });
    }
    async update(burialCode, dto) {
        return await this.burialRepo.manager.transaction(async (entityManager) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
            let burial = await entityManager.findOne(Burial_1.Burial, {
                where: {
                    burialCode,
                },
                relations: {
                    lot: true,
                    reservation: {
                        user: {
                            userProfilePic: {
                                file: true,
                            },
                        },
                    },
                    workOrder: {
                        assignedStaffUser: {
                            userProfilePic: true,
                        },
                    },
                },
            });
            if (!burial) {
                throw Error(burial_constant_1.BURIAL_ERROR_NOT_FOUND);
            }
            burial.burialFullName = (0, utils_1.getFullName)((_a = dto.burialFirstName) !== null && _a !== void 0 ? _a : "", (_b = dto.burialMiddleName) !== null && _b !== void 0 ? _b : "", (_c = dto.burialLastName) !== null && _c !== void 0 ? _c : "");
            burial.burialFirstName = dto.burialFirstName;
            burial.burialMiddleName = dto.burialMiddleName;
            burial.burialLastName = dto.burialLastName;
            burial.burialAge = dto.burialAge;
            burial.address = dto.address;
            const dateOfBirth = (0, moment_1.default)(new Date(dto.dateOfBirth), date_constant_1.DateConstant.DATE_LANGUAGE).format();
            burial.dateOfBirth = dateOfBirth;
            const dateOfDeath = (0, moment_1.default)(new Date(dto.dateOfDeath), date_constant_1.DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD");
            burial.dateOfDeath = dateOfDeath;
            const dateOfBurial = (0, moment_1.default)(new Date(dto.dateOfBurial), date_constant_1.DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD");
            const currentDateOfBurial = (0, moment_1.default)(new Date(burial.dateOfBurial), date_constant_1.DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD");
            const dateChanged = currentDateOfBurial !== dateOfBurial;
            burial.dateOfBurial = dateOfBurial;
            burial.familyContactPerson = dto.familyContactPerson;
            burial.familyContactNumber = dto.familyContactNumber;
            const assignedStaffUserChanged = ((_e = (_d = burial === null || burial === void 0 ? void 0 : burial.workOrder) === null || _d === void 0 ? void 0 : _d.assignedStaffUser) === null || _e === void 0 ? void 0 : _e.userId) !==
                dto.assignedStaffUserId;
            const oldAssignedStaffUser = (_f = burial === null || burial === void 0 ? void 0 : burial.workOrder) === null || _f === void 0 ? void 0 : _f.assignedStaffUser;
            burial = await entityManager.save(Burial_1.Burial, burial);
            burial.burialCode = (0, utils_1.generateIndentityCode)(burial.burialId);
            burial = await entityManager.save(Burial_1.Burial, burial);
            burial = await entityManager.findOne(Burial_1.Burial, {
                where: {
                    burialCode: burial.burialCode,
                },
                relations: {
                    lot: true,
                    reservation: {
                        user: {
                            userProfilePic: {
                                file: true,
                            },
                        },
                    },
                    workOrder: {
                        assignedStaffUser: {
                            userProfilePic: true,
                        },
                    },
                },
            });
            if (dateChanged && !assignedStaffUserChanged) {
                const workOrderNotifTitle = `Burial work order schedule was moved!`;
                const workOrderNotifDesc = `Burial Burial work order schedule at block ${burial.lot.block}, lot ${burial.lot.lotCode} was moved on to ${(0, moment_1.default)(dateOfBurial).format("MMM DD, YYYY")} `;
                burial.workOrder.dateTargetCompletion = dateOfBurial;
                burial.workOrder.title = `Burial work order on ${(0, moment_1.default)(dateOfBurial).format("MMM DD, YYYY")}`;
                burial.workOrder.description =
                    "Date of Burial: " +
                        (0, moment_1.default)(dateOfBurial).format("MMM DD, YYYY") +
                        "\n";
                "Location\n" +
                    "Block: " +
                    burial.lot.block +
                    " \n" +
                    "Lot: " +
                    burial.lot.lotCode +
                    " \n";
                burial.workOrder = await entityManager.save(WorkOrder_1.WorkOrder, burial.workOrder);
                const staffNotificationIds = await this.logNotification([burial.workOrder.assignedStaffUser], "WORK_ORDER", burial.workOrder, entityManager, workOrderNotifTitle, workOrderNotifDesc);
                await this.syncRealTime([burial.workOrder.assignedStaffUser.userId], burial);
                const pushNotifResults = await Promise.all([
                    this.oneSignalNotificationService.sendToExternalUser(burial.workOrder.assignedStaffUser.userName, "WORK_ORDER", burial.burialCode, staffNotificationIds, workOrderNotifTitle, workOrderNotifDesc),
                ]);
                console.log("Push notif results ", JSON.stringify(pushNotifResults));
            }
            else if (assignedStaffUserChanged) {
                const workOrderNotifTitleOld = `Burial work order was no longer assigned to you!`;
                const workOrderNotifDescOld = `Burial work order at block ${(_g = burial === null || burial === void 0 ? void 0 : burial.lot) === null || _g === void 0 ? void 0 : _g.block}, lot ${(_h = burial === null || burial === void 0 ? void 0 : burial.lot) === null || _h === void 0 ? void 0 : _h.lotCode} was no longer assigned to you!`;
                const workOrderNotifTitleNew = `New Burial work order assigned to you!`;
                const workOrderNotifDescNew = `Burial work order on ${(0, moment_1.default)(dateOfBurial).format("MMM DD, YYYY")} at block ${burial.lot.block}, lot ${(_j = burial === null || burial === void 0 ? void 0 : burial.lot) === null || _j === void 0 ? void 0 : _j.lotCode}`;
                burial.workOrder.dateTargetCompletion = dateOfBurial;
                burial.workOrder.title = `Burial work order on ${(0, moment_1.default)(dateOfBurial).format("MMM DD, YYYY")}`;
                burial.workOrder.description =
                    "Date of Burial: " +
                        (0, moment_1.default)(dateOfBurial).format("MMM DD, YYYY") +
                        "\n";
                "Location\n" +
                    "Block: " +
                    burial.lot.block +
                    " \n" +
                    "Lot: " +
                    burial.lot.lotCode +
                    " \n";
                const newAssignedStaffUser = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userId: dto.assignedStaffUserId,
                        userType: user_type_constant_1.USER_TYPE.STAFF,
                        active: true,
                    },
                });
                if (!newAssignedStaffUser) {
                    throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                }
                burial.workOrder.assignedStaffUser = newAssignedStaffUser;
                burial.workOrder = await entityManager.save(WorkOrder_1.WorkOrder, burial.workOrder);
                const oldStaffNotificationIds = await this.logNotification([oldAssignedStaffUser], "WORK_ORDER", burial.workOrder, entityManager, workOrderNotifTitleOld, workOrderNotifDescOld);
                const newStaffNotificationIds = await this.logNotification([burial.workOrder.assignedStaffUser], "WORK_ORDER", burial.workOrder, entityManager, workOrderNotifTitleNew, workOrderNotifDescNew);
                await this.syncRealTime([
                    oldAssignedStaffUser === null || oldAssignedStaffUser === void 0 ? void 0 : oldAssignedStaffUser.userId,
                    burial.workOrder.assignedStaffUser.userId,
                ], burial);
                const pushNotifResultsOld = await Promise.all([
                    this.oneSignalNotificationService.sendToExternalUser(oldAssignedStaffUser.userName, "WORK_ORDER", burial.burialCode, newStaffNotificationIds, workOrderNotifTitleOld, workOrderNotifDescOld),
                ]);
                const pushNotifResultsNew = await Promise.all([
                    this.oneSignalNotificationService.sendToExternalUser(burial.workOrder.assignedStaffUser.userName, "WORK_ORDER", burial.burialCode, oldStaffNotificationIds, workOrderNotifTitleOld, workOrderNotifDescOld),
                ]);
                console.log("Push notif results ", JSON.stringify([...pushNotifResultsOld, ...pushNotifResultsNew]));
            }
            burial = await entityManager.findOne(Burial_1.Burial, {
                where: {
                    burialCode: burial.burialCode,
                },
                relations: {
                    lot: true,
                    reservation: {
                        user: {
                            userProfilePic: {
                                file: true,
                            },
                        },
                    },
                    workOrder: {
                        assignedStaffUser: {
                            userProfilePic: true,
                        },
                    },
                },
            });
            (_l = (_k = burial === null || burial === void 0 ? void 0 : burial.workOrder) === null || _k === void 0 ? void 0 : _k.assignedStaffUser) === null || _l === void 0 ? true : delete _l.password;
            (_o = (_m = burial === null || burial === void 0 ? void 0 : burial.reservation) === null || _m === void 0 ? void 0 : _m.user) === null || _o === void 0 ? true : delete _o.password;
            return burial;
        });
    }
    async delete(burialCode) {
        return await this.burialRepo.manager.transaction(async (entityManager) => {
            var _a, _b, _c, _d;
            let burial = await entityManager.findOne(Burial_1.Burial, {
                where: {
                    burialCode,
                    active: true,
                },
                relations: {
                    lot: true,
                    reservation: {
                        user: {
                            userProfilePic: {
                                file: true,
                            },
                        },
                    },
                    workOrder: {
                        assignedStaffUser: {
                            userProfilePic: true,
                        },
                    },
                },
            });
            if (!burial) {
                throw Error(burial_constant_1.BURIAL_ERROR_NOT_FOUND);
            }
            burial.active = false;
            burial = await entityManager.save(Burial_1.Burial, burial);
            burial.lot.status = lot_constant_1.LOT_STATUS.AVAILABLE;
            burial.lot = await entityManager.save(Lot_1.Lot, burial.lot);
            const workOrderNotifTitle = `Burial work order schedule was canceled!`;
            const workOrderNotifDesc = `Burial Burial work order schedule at block ${burial.lot.block}, lot ${burial.lot.lotCode} was canceled!`;
            burial.active = false;
            burial.workOrder = await entityManager.save(WorkOrder_1.WorkOrder, burial.workOrder);
            const staffNotificationIds = await this.logNotification([burial.workOrder.assignedStaffUser], "WORK_ORDER", burial.workOrder, entityManager, workOrderNotifTitle, workOrderNotifDesc);
            await this.syncRealTime([burial.workOrder.assignedStaffUser.userId], burial);
            const pushNotifResults = await Promise.all([
                this.oneSignalNotificationService.sendToExternalUser(burial.workOrder.assignedStaffUser.userName, "WORK_ORDER", burial.burialCode, staffNotificationIds, workOrderNotifTitle, workOrderNotifDesc),
            ]);
            console.log("Push notif results ", JSON.stringify(pushNotifResults));
            burial = await entityManager.findOne(Burial_1.Burial, {
                where: {
                    burialCode: burial.burialCode,
                },
                relations: {
                    lot: true,
                    reservation: {
                        user: {
                            userProfilePic: {
                                file: true,
                            },
                        },
                    },
                    workOrder: {
                        assignedStaffUser: {
                            userProfilePic: true,
                        },
                    },
                },
            });
            (_b = (_a = burial === null || burial === void 0 ? void 0 : burial.workOrder) === null || _a === void 0 ? void 0 : _a.assignedStaffUser) === null || _b === void 0 ? true : delete _b.password;
            (_d = (_c = burial === null || burial === void 0 ? void 0 : burial.reservation) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? true : delete _d.password;
            return burial;
        });
    }
    async logNotification(users, type, data, entityManager, title, description) {
        const notifications = [];
        for (const user of users) {
            notifications.push({
                title,
                description,
                type,
                referenceId: type === "WORK_ORDER"
                    ? data["workOrderCode"].toString()
                    : data["burialCode"].toString(),
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
        await this.pusherService.burialChanges(userIds, data);
    }
};
BurialService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(Burial_1.Burial)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        pusher_service_1.PusherService,
        one_signal_notification_service_1.OneSignalNotificationService])
], BurialService);
exports.BurialService = BurialService;
//# sourceMappingURL=burial.service.js.map