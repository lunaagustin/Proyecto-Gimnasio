import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { RutinaService } from './rutina.service';
import { CreateRutinaDto } from './dto/create-rutina.dto';
import { UpdateRutinaDto } from './dto/update-rutina.dto';

@Controller('rutina')
export class RutinaController {
  constructor(private readonly rutinaService: RutinaService) {}

  @Post()
  async createRutina(@Body() rutina: CreateRutinaDto) {
    return this.rutinaService.createRutina(rutina);
  }

  @Post(':id/ejercicios')
  async agregarEjercicio(
    @Param('id', ParseIntPipe) idRutina: number,
    @Body() ids: number[],
  ) {
    return this.rutinaService.agregarEjercicios(idRutina, ids);
  }

  @Get()
  async findAllRutinas() {
    return this.rutinaService.findAllRutinas();
  }

  @Get(':id')
  async findOneRutina(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.rutinaService.findOneRutina(+id);
  }

  @Put(':id')
  async updateRutina(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() rutina: UpdateRutinaDto,
  ) {
    return this.rutinaService.updateRutina(+id, rutina);
  }

  @Delete(':id')
  async deleteRutina(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.rutinaService.deleteRutina(+id);
  }
}
