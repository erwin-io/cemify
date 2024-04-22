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
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment_1 = __importDefault(require("moment"));
const date_constant_1 = require("../common/constant/date.constant");
const notifications_constant_1 = require("../common/constant/notifications.constant");
const timestamp_constant_1 = require("../common/constant/timestamp.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const user_type_constant_1 = require("../common/constant/user-type.constant");
const utils_1 = require("../common/utils/utils");
const Notifications_1 = require("../db/entities/Notifications");
const Reservation_1 = require("../db/entities/Reservation");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
const one_signal_notification_service_1 = require("./one-signal-notification.service");
const reservation_constant_1 = require("../common/constant/reservation.constant");
const lot_constant_1 = require("../common/constant/lot.constant");
const Lot_1 = require("../db/entities/Lot");
const pusher_service_1 = require("./pusher.service");
let ReservationService = class ReservationService {
    constructor(reservationRepo, pusherService, oneSignalNotificationService) {
        this.reservationRepo = reservationRepo;
        this.pusherService = pusherService;
        this.oneSignalNotificationService = oneSignalNotificationService;
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.reservationRepo.find({
                where: Object.assign({}, condition),
                skip,
                take,
                order,
                relations: {
                    lot: true,
                    user: {
                        userProfilePic: {
                            file: true,
                        },
                    },
                },
            }),
            this.reservationRepo.count({
                where: Object.assign({}, condition),
            }),
        ]);
        return {
            results: results.map((res) => {
                var _a;
                (_a = res.user) === null || _a === void 0 ? true : delete _a.password;
                return Object.assign({}, res);
            }),
            total,
        };
    }
    async getByCode(reservationCode = "") {
        var _a, _b;
        const result = await this.reservationRepo.findOne({
            where: {
                reservationCode: (_a = reservationCode === null || reservationCode === void 0 ? void 0 : reservationCode.toString()) === null || _a === void 0 ? void 0 : _a.toLowerCase(),
            },
            relations: {
                lot: true,
                user: {
                    userProfilePic: {
                        file: true,
                    },
                },
            },
        });
        if (!result) {
            throw Error(reservation_constant_1.RESERVATION_ERROR_NOT_FOUND);
        }
        (_b = result.user) === null || _b === void 0 ? true : delete _b.password;
        return result;
    }
    async create(dto) {
        return await this.reservationRepo.manager.transaction(async (entityManager) => {
            const lot = await entityManager.findOne(Lot_1.Lot, {
                where: {
                    lotCode: dto.lotCode,
                },
            });
            if (!lot) {
                throw Error(lot_constant_1.LOT_ERROR_NOT_FOUND);
            }
            if (lot && lot.status !== lot_constant_1.LOT_STATUS.AVAILABLE) {
                throw Error(lot_constant_1.LOT_ERROR_NOT_AVAILABLE);
            }
            let reservation = await entityManager.findOne(Reservation_1.Reservation, {
                where: {
                    lot: {
                        lotCode: dto.lotCode,
                    },
                    user: {
                        userCode: dto.userCode,
                    },
                    status: (0, typeorm_2.In)(["PENDING", "APPROVED"]),
                },
            });
            if (reservation) {
                throw Error("The user has a " +
                    reservation.status.toLocaleLowerCase() +
                    " reservation for the selected lot.");
            }
            else {
                reservation = new Reservation_1.Reservation();
            }
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            reservation.dateTime = timestamp;
            reservation.burialName = dto.burialName;
            const dateOfBirth = (0, moment_1.default)(new Date(dto.dateOfBirth), date_constant_1.DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD");
            reservation.dateOfBirth = dateOfBirth;
            const dateOfDeath = (0, moment_1.default)(new Date(dto.dateOfDeath), date_constant_1.DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD");
            reservation.dateOfDeath = dateOfDeath;
            const dateOfBurial = (0, moment_1.default)(new Date(dto.dateOfBurial), date_constant_1.DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD");
            reservation.dateOfBurial = dateOfBurial;
            reservation.familyContactPerson = dto.familyContactPerson;
            reservation.familyContactNumber = dto.familyContactNumber;
            const user = await entityManager.findOne(Users_1.Users, {
                where: {
                    userCode: dto.userCode,
                    userType: user_type_constant_1.USER_TYPE.CLIENT,
                },
            });
            if (!user) {
                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
            }
            reservation.user = user;
            reservation.lot = lot;
            reservation.status = reservation_constant_1.RESERVATION_STATUS.PENDING;
            reservation = await entityManager.save(reservation);
            reservation.reservationCode = (0, utils_1.generateIndentityCode)(reservation.reservationId);
            reservation = await entityManager.save(reservation);
            return await entityManager.findOne(Reservation_1.Reservation, {
                where: {
                    reservationCode: reservation.reservationCode,
                },
                relations: {
                    lot: true,
                    user: {
                        userProfilePic: {
                            file: true,
                        },
                    },
                },
            });
        });
    }
    async update(reservationCode, dto) {
        return await this.reservationRepo.manager.transaction(async (entityManager) => {
            let reservation = await entityManager.findOne(Reservation_1.Reservation, {
                where: {
                    reservationCode,
                },
                relations: {
                    lot: true,
                    user: {
                        userProfilePic: {
                            file: true,
                        },
                    },
                },
            });
            if (!reservation) {
                throw Error(reservation_constant_1.RESERVATION_ERROR_NOT_FOUND);
            }
            if (reservation.status !== reservation_constant_1.RESERVATION_STATUS.PENDING) {
                throw Error("The booking was already: " + reservation.status.toLocaleLowerCase());
            }
            reservation.burialName = dto.burialName;
            const dateOfBirth = (0, moment_1.default)(new Date(dto.dateOfBirth), date_constant_1.DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD");
            reservation.dateOfBirth = dateOfBirth;
            const dateOfDeath = (0, moment_1.default)(new Date(dto.dateOfDeath), date_constant_1.DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD");
            reservation.dateOfDeath = dateOfDeath;
            const dateOfBurial = (0, moment_1.default)(new Date(dto.dateOfBurial), date_constant_1.DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD");
            reservation.dateOfBurial = dateOfBurial;
            reservation = await entityManager.save(Reservation_1.Reservation, reservation);
            return await entityManager.findOne(Reservation_1.Reservation, {
                where: {
                    reservationCode: reservation.reservationCode,
                },
                relations: {
                    lot: true,
                    user: {
                        userProfilePic: {
                            file: true,
                        },
                    },
                },
            });
        });
    }
    async updateStatus(reservationCode, dto) {
        return await this.reservationRepo.manager.transaction(async (entityManager) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const reservation = await entityManager.findOne(Reservation_1.Reservation, {
                where: {
                    reservationCode,
                },
                relations: {
                    lot: true,
                    user: {
                        userProfilePic: {
                            file: true,
                        },
                    },
                },
            });
            if (!reservation) {
                throw Error(reservation_constant_1.RESERVATION_ERROR_NOT_FOUND);
            }
            if (reservation.status !== reservation_constant_1.RESERVATION_STATUS.PENDING) {
                throw Error("The booking was already: " + reservation.status.toLocaleLowerCase());
            }
            reservation.status = dto.status;
            let title;
            let desc;
            const status = reservation.status;
            if (status === reservation_constant_1.RESERVATION_STATUS.APPROVED) {
                title = notifications_constant_1.NOTIF_TITLE.RESERVATION_APPROVED;
                desc = `Your reservation for block ${(_a = reservation === null || reservation === void 0 ? void 0 : reservation.lot) === null || _a === void 0 ? void 0 : _a.block} - lot ${(_b = reservation === null || reservation === void 0 ? void 0 : reservation.lot) === null || _b === void 0 ? void 0 : _b.lotCode} has now been Approved!`;
            }
            else if (status === reservation_constant_1.RESERVATION_STATUS.APPROVED) {
                title = notifications_constant_1.NOTIF_TITLE.RESERVATION_APPROVED;
                desc = `Your reservation for block ${(_c = reservation === null || reservation === void 0 ? void 0 : reservation.lot) === null || _c === void 0 ? void 0 : _c.block} - lot ${(_d = reservation === null || reservation === void 0 ? void 0 : reservation.lot) === null || _d === void 0 ? void 0 : _d.lotCode} has now been officially Leased to you!`;
            }
            else if (status === reservation_constant_1.RESERVATION_STATUS.REJECTED) {
                title = notifications_constant_1.NOTIF_TITLE.RESERVATION_REJECTED;
                desc = `Your reservation for block ${(_e = reservation === null || reservation === void 0 ? void 0 : reservation.lot) === null || _e === void 0 ? void 0 : _e.block} - lot ${(_f = reservation === null || reservation === void 0 ? void 0 : reservation.lot) === null || _f === void 0 ? void 0 : _f.lotCode} was Rejected!`;
            }
            else {
                title = `Your reservation was ${status.toLowerCase().charAt(0).toUpperCase() + status.slice(1)}`;
                desc = `Your reservation for block ${(_g = reservation === null || reservation === void 0 ? void 0 : reservation.lot) === null || _g === void 0 ? void 0 : _g.block} - lot ${(_h = reservation === null || reservation === void 0 ? void 0 : reservation.lot) === null || _h === void 0 ? void 0 : _h.lotCode} was now being ${status.toLowerCase().charAt(0).toUpperCase() + status.slice(1)}!`;
            }
            const notificationIds = await this.logNotification([reservation.user], reservation, entityManager, title, desc);
            const staffUsers = await entityManager.find(Users_1.Users, {
                where: { userType: user_type_constant_1.USER_TYPE.STAFF },
            });
            if (status === reservation_constant_1.RESERVATION_STATUS.CANCELLED) {
                await this.syncRealTime([...staffUsers.map((x) => x.userId), reservation.user.userId], reservation);
            }
            else {
                await this.syncRealTime([reservation.user.userId], reservation);
            }
            const pushNotifResults = await Promise.all([
                this.oneSignalNotificationService.sendToExternalUser(reservation.user.userName, "RESERVATION", reservation.reservationCode, notificationIds, title, desc),
            ]);
            console.log("Push notif results ", JSON.stringify(pushNotifResults));
            return await entityManager.save(Reservation_1.Reservation, reservation);
        });
    }
    async logNotification(users, data, entityManager, title, description) {
        const notifications = [];
        for (const user of users) {
            notifications.push({
                title,
                description,
                type: notifications_constant_1.NOTIF_TYPE.RESERVATION.toString(),
                referenceId: data.reservationCode.toString(),
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
        await this.pusherService.reservationChanges(userIds, data);
    }
};
ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Reservation_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        pusher_service_1.PusherService,
        one_signal_notification_service_1.OneSignalNotificationService])
], ReservationService);
exports.ReservationService = ReservationService;
//# sourceMappingURL=reservation.service.js.map