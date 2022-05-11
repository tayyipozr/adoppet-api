import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/auth/guard';
import { GetUser } from '../auth/decorator';
import { CreatePetDto, EditPetDto } from './dto';
import { PetService } from './pet.service';

@UseGuards(AtGuard)
@Controller('pets')
export class PetController {

  constructor(private readonly petService: PetService) { }

  @Get(':id')
  async getAll(@GetUser('id') userId: number, @Param('id', ParseIntPipe) typeId: number) {
    return await this.petService.getAll(typeId, userId);
  }

  @Get()
  async getPets(@GetUser('id') userId: number) {
    return await this.petService.getPets(userId);
  }

  @Get()
  async getTypes() {
    return await this.petService.getPetTypes();
  }

  @Get(':id')
  async getPetById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) petId: number) {
    return await this.petService.getPetById(userId, petId);
  }

  @Post()
  async createPet(@GetUser('id') userId: number, @Body() dto: CreatePetDto) {
    return await this.petService.createPet(userId, dto);

  }

  @Patch(':id')
  async editPetById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) petId: number, @Body() dto: EditPetDto) {
    return await this.petService.editPetById(userId, petId, dto);

  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deletePetById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) petId: number) {
    return await this.petService.deletePetById(userId, petId);
  }




}
