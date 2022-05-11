

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AdoptionContractDto {

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  petId: number;

  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  adopterName: string;

  @IsString()
  @IsNotEmpty()
  approvedAt: string;

  @IsString()
  @IsNotEmpty()
  healthStatus: string;
}