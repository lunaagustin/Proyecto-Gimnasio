import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { RutinaService } from './rutina.service';
import { CreateRutinaDto } from './dto/create-rutina.dto';
import { UpdateRutinaDto } from './dto/update-rutina.dto';
import { Rutina } from './entities/rutina.entity';

@Controller('rutina')
export class RutinaController {
  constructor(private readonly rutinaService: RutinaService) {}

 @Post()
   async create(@Body() Rutina: CreateRutinaDto) {
     return this.rutinaService.createRutina(Rutina);
   }

 
   @Get()
   async getRutinas() {
     return this.rutinaService.getRutinas();
   }
 
   @Get(':id')
   async getRutina(@Param('id', ParseIntPipe) id: number): Promise<Rutina> {
     /*con parseIntPipe cambiamos de string a number*/
     const rutina = await this.rutinaService.getRutina(id);
     if (!rutina) {
       throw new NotFoundException(`Rutina con id ${id} no se encuentra`);
     }
     return rutina;
   }
 
   @Delete(':id')
   deleteRutina(@Param('id', ParseIntPipe) id: number) {
     return this.rutinaService.deleteRutina(id);
   }
 
   @Put(':id')
   updateRutina(
     @Param('id', ParseIntPipe) id: number,
     @Body()
     user: UpdateRutinaDto,
   ) {
     return this.rutinaService.updateRutina(id, user);
   }
 }
 