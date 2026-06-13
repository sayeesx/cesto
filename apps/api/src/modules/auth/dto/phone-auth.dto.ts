import { IsString, IsNotEmpty, IsOptional, IsInt, IsEnum, IsEmail, Min, Max } from 'class-validator';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
}

export class PhoneStartDto {
  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class PhoneVerifyDto {
  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}

export class PhoneCompleteProfileDto {
  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsInt()
  @Min(13)
  @Max(120)
  @IsOptional()
  age?: number;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;
}
