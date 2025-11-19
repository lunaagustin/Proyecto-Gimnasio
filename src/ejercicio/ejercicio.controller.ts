import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { EjercicioService } from './ejercicio.service';
import { CreateEjercicioDto } from './dto/create-ejercicio.dto';
import { UpdateEjercicioDto } from './dto/update-ejercicio.dto';
import { Ejercicio } from './entities/ejercicio.entity';

@Controller('ejercicio')
export class EjercicioController {
  constructor(private readonly ejercicioService: EjercicioService) {}

  @Post()
  async createEjercicio(@Body() ejercicio: CreateEjercicioDto) {
    return this.ejercicioService.createEjercicio(ejercicio);
  }

  @Get()
  async getEjercicios() {
    return this.ejercicioService.getEjercicios();
  }

  @Get(':id')
  async getEjercicio(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Ejercicio> {
    /*con parseIntPipe cambiamos de string a number*/
    const ejercicio = await this.ejercicioService.getEjercicio(id);
    if (!ejercicio) {
      throw new NotFoundException(`Ejercicio con id ${id} no se encuentra`);
    }
    return ejercicio;
  }

  @Delete(':id')
  deleteEjercicio(@Param('id', ParseIntPipe) id: number) {
    return this.ejercicioService.deleteEjercicio(id);
  }

  @Put(':id')
  updateEjercicio(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    user: UpdateEjercicioDto,
  ) {
    return this.ejercicioService.updateEjercicio(id, user);
  }
}
