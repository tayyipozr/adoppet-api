import { Gender } from "@prisma/client"
import { IsBoolean, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

export class CreatePetDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string

  @IsString()
  description: string

  @IsNumber()
  age: number

  @IsNumber()
  height: number

  @IsNumber()
  weight: number

  @IsNumber()
  @IsNotEmpty()
  genderId: number

  @IsNumber()
  @IsNotEmpty()
  typeId: number
}