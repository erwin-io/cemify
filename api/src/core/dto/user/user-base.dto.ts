import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsUppercase,
  ValidateNested,
} from "class-validator";
import moment from "moment";

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: string;
}

export class DefaultUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: "Not allowed, First name is required!"
  })
  firstName: string;

  @ApiProperty()
  @IsOptional()
  middleName: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Not allowed, Last name is required!"
  })
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  @Transform(({ obj, key }) => {
    return obj && obj[key] ? obj[key]?.toString() : "0";
  })
  age: string;

  @ApiProperty({
    default: moment().format("YYYY-MM-DD")
  })
  @IsNotEmpty()
  @IsDateString({ strict: true } as any)
  birthDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @Transform(({ obj, key }) => {
    return obj[key].toString();
  })
  mobileNumber: string;
}

export class UpdateProfilePictureDto {
  @ApiProperty()
  @IsOptional()
  userProfilePic: any;
}