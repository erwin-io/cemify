import { Files } from './files.model';

export class Users {
    userId: string;
    userName: string;
    fullName: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    birthDate: string;
    age: string;
    address: string;
    mobileNumber: string;
    accessGranted: boolean;
    active: boolean;
    userCode: string;
    userType: 'ADMIN' | 'STAFF' | 'CLIENT';
    userProfilePic: UserProfilePic;
    totalUnreadNotif;
  }

  export class UserProfilePic {
    userId: string;
    file: Files;
    user: Users;
  }
