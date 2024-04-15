import { Files } from "./files.model";

export class Users {
    userId: string;
    userName: string;
    fullName: string;
    mobileNumber: string;
    accessGranted: boolean;
    active: boolean;
    userCode: string;
    userType: "ADMIN" | "STAFF" | "CLIENT";
    userProfilePic: UserProfilePic;
    totalUnreadNotif;
  }

  export class UserProfilePic {
    userId: string;
    file: Files;
    user: Users;
  }
