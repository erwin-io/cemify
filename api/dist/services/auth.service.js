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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const utils_1 = require("../common/utils/utils");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const Users_1 = require("../db/entities/Users");
const auth_error_constant_1 = require("../common/constant/auth-error.constant");
const user_type_constant_1 = require("../common/constant/user-type.constant");
const notifications_service_1 = require("./notifications.service");
let AuthService = class AuthService {
    constructor(userRepo, jwtService, notificationService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
        this.notificationService = notificationService;
    }
    async registerClient(dto) {
        try {
            return await this.userRepo.manager.transaction(async (transactionalEntityManager) => {
                var _a, _b, _c;
                let user = new Users_1.Users();
                user.userName = dto.mobileNumber;
                user.password = await (0, utils_1.hash)(dto.password);
                user.accessGranted = true;
                user.fullName = (0, utils_1.getFullName)((_a = dto.firstName) !== null && _a !== void 0 ? _a : "", (_b = dto.middleName) !== null && _b !== void 0 ? _b : "", (_c = dto.lastName) !== null && _c !== void 0 ? _c : "");
                user.firstName = dto.firstName;
                user.middleName = dto.middleName;
                user.lastName = dto.lastName;
                user.age = dto.age;
                user.birthDate = (0, moment_1.default)(dto.birthDate).format("YYYY-MM-DD");
                user.address = dto.address;
                user.mobileNumber = dto.mobileNumber;
                user.userType = user_type_constant_1.USER_TYPE.CLIENT.toUpperCase();
                user = await transactionalEntityManager.save(user);
                user.userCode = (0, utils_1.generateIndentityCode)(user.userId);
                user = await transactionalEntityManager.save(Users_1.Users, user);
                delete user.password;
                return user;
            });
        }
        catch (ex) {
            if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_user_number")) {
                throw Error("Number already used!");
            }
            else if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_username")) {
                throw Error("Username already used!");
            }
            else {
                throw ex;
            }
        }
    }
    async getByCredentials({ userName, password }) {
        try {
            let user = await this.userRepo.findOne({
                where: {
                    userName,
                    active: true,
                },
                relations: {
                    access: true,
                    userProfilePic: {
                        file: true,
                    },
                }
            });
            if (!user) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_USER_NOT_FOUND);
            }
            const passwordMatch = await (0, utils_1.compare)(user.password, password);
            if (!passwordMatch) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_PASSWORD_INCORRECT);
            }
            if (!user.accessGranted) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_PENDING_ACCESS_REQUEST);
            }
            delete user.password;
            return user;
        }
        catch (ex) {
            throw ex;
        }
    }
    async getStaffByCredentials({ userName, password }) {
        try {
            let user = await this.userRepo.findOne({
                where: {
                    userName,
                    active: true,
                    userType: (0, typeorm_2.In)([user_type_constant_1.USER_TYPE.ADMIN.toUpperCase(), user_type_constant_1.USER_TYPE.STAFF.toUpperCase()])
                },
                relations: {
                    access: true,
                    userProfilePic: {
                        file: true,
                    },
                }
            });
            if (!user) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_USER_NOT_FOUND);
            }
            const passwordMatch = await (0, utils_1.compare)(user.password, password);
            if (!passwordMatch) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_PASSWORD_INCORRECT);
            }
            if (!user.accessGranted) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_PENDING_ACCESS_REQUEST);
            }
            delete user.password;
            const totalUnreadNotif = await this.notificationService.getUnreadByUser(user.userId);
            return Object.assign(Object.assign({}, user), { totalUnreadNotif });
        }
        catch (ex) {
            throw ex;
        }
    }
    async getClientByCredentials({ userName, password }) {
        try {
            let user = await this.userRepo.findOne({
                where: {
                    userName,
                    active: true,
                    userType: user_type_constant_1.USER_TYPE.CLIENT.toUpperCase()
                },
                relations: {
                    userProfilePic: {
                        file: true,
                    },
                }
            });
            if (!user) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_USER_NOT_FOUND);
            }
            const passwordMatch = await (0, utils_1.compare)(user.password, password);
            if (!passwordMatch) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_PASSWORD_INCORRECT);
            }
            if (!user.accessGranted) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_PENDING_ACCESS_REQUEST);
            }
            delete user.password;
            const totalUnreadNotif = await this.notificationService.getUnreadByUser(user.userId);
            return Object.assign(Object.assign({}, user), { totalUnreadNotif });
        }
        catch (ex) {
            throw ex;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Users_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        notifications_service_1.NotificationsService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map