import { IsBoolean, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class EditPetDto {

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string

  @IsNumber()
  @IsOptional()
  age: number

  @IsDecimal()
  @IsOptional()
  height: number

  @IsDecimal()
  @IsOptional()
  weight: number

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  typeId: number

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  genderId: number

}