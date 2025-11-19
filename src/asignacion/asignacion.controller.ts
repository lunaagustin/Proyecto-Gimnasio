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
import { AsignacionService } from './asignacion.service';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';
import { Asignacion } from './entities/asignacion.entity';

@Controller('asignacion')
export class AsignacionController {
  constructor(private readonly asignacionService: AsignacionService) {}

  @Post()
  async create(@Body() Asignacion: CreateAsignacionDto) {
    return this.asignacionService.createAsignacion(Asignacion);
  }

  @Get()
  async getAsignaciones() {
    return this.asignacionService.getAsignaciones();
  }

  @Get(':id')
  async getAsignacion(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Asignacion> {
    /*con parseIntPipe cambiamos de string a number*/
    const asignacion = await this.asignacionService.getAsignacion(id);
    if (!asignacion) {
      throw new NotFoundException(`Asignacion con id ${id} no se encuentra`);
    }
    return asignacion;
  }

  @Delete(':id')
  deleteAsignacion(@Param('id', ParseIntPipe) id: number) {
    return this.asignacionService.deleteAsignacion(id);
  }

  @Put(':id')
  updateAsignacion(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    user: UpdateAsignacionDto,
  ) {
    return this.asignacionService.updateAsignacion(id, user);
  }
}
