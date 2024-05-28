import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsBooleanString,
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  ValidateNested,
} from "class-validator";
import moment from "moment";

export class DefaultBurialDto {
  @ApiProperty()
  @IsNotEmpty({
    message: "Not allowed, First name is required!"
  })
  burialFirstName: string;
  
  @ApiProperty()
  @IsOptional()
  burialMiddleName: string;
  
  @ApiProperty()
  @IsNotEmpty({
    message: "Not allowed, Last name is required!"
  })
  burialLastName: string;
  
  @ApiProperty()
  @IsNotEmpty({
    message: "Not allowed, Address is required!"
  })
  address: string;
  
  @ApiProperty()
  @IsOptional()
  burialAge: string;

  @ApiProperty({
    default: moment().format("YYYY-MM-DD")
  })
  @IsNotEmpty()
  @IsDateString({ strict: true } as any)
  dateOfBirth: Date;

  @ApiProperty({
    default: moment().format("YYYY-MM-DD")
  })
  @IsNotEmpty()
  @IsDateString({ strict: true } as any)
  dateOfDeath: Date;

  @ApiProperty({
    default: moment().format("YYYY-MM-DD")
  })
  @IsNotEmpty()
  @IsDateString({ strict: true } as any)
  dateOfBurial: Date;

  @ApiProperty()
  @IsNotEmpty({
    message: "Not allowed, Family contact person is required!"
  })
  familyContactPerson: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Not allowed, Family contact number is required!"
  })
  familyContactNumber: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Not allowed, Assigned user is required!"
  })
  assignedStaffUserId: string;
}