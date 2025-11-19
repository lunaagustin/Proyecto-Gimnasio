import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { EntrenadorService } from './entrenador.service';
import { CreateEntrenadorDto } from './dto/create-entrenador.dto';
import { UpdateEntrenadorDto } from './dto/update-entrenador.dto';
import { Entrenador } from './entities/entrenador.entity';

@Controller('entrenador')
export class EntrenadorController {
  constructor(private entrenadorService: EntrenadorService) {}

  @Post()
  create(@Body() newEntrenador: CreateEntrenadorDto) {
    return this.entrenadorService.createEntrenador(newEntrenador);
  }

  @Get()
  async getEntrenadores() {
    return this.entrenadorService.getEntrenadores();
  }

  @Get(':id')
  async getEntrenador(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Entrenador> {
    /*con parseIntPipe cambiamos de string a number*/
    const entrenador = await this.entrenadorService.getEntrenador(id);
    if (!entrenador) {
      throw new NotFoundException(`Entrenador con id ${id} no se encuentra`);
    }
    return entrenador;
  }

  @Delete(':id')
  deleteEntrenador(@Param('id', ParseIntPipe) id: number) {
    return this.entrenadorService.deleteEntrenador(id);
  }

  @Put(':id')
  updateEntrenador(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    user: UpdateEntrenadorDto,
  ) {
    return this.entrenadorService.updateEntrenador(id, user);
  }
}
