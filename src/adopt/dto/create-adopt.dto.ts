import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateAdoptDto {

  @IsNotEmpty()
  petId: number

}