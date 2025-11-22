import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { CreateEntrenadorDto } from 'src/entrenador/dto/create-entrenador.dto';
import { CreatePlanDto } from 'src/plan/dto/create-plan.dto';

@Controller('alumno')
export class AlumnoController {
  constructor(private readonly alumnoService: AlumnoService) { }

  @Post()
  async createAlumno(@Body() alumno: CreateAlumnoDto):Promise<Alumno> {
    return this.alumnoService.createAlumno(alumno);
  }

  @Get()
  async getAlumnos():Promise<Alumno[]> {
    return this.alumnoService.getAlumnos();
  }

  @Get(':id')
  async getAlumno(@Param('id', ParseIntPipe) id: number): Promise<Alumno> {
    /*con parseIntPipe cambiamos de string a number*/
    const alumno = await this.alumnoService.getAlumno(id);
    if (!alumno) {
      throw new NotFoundException(`Alumno con id ${id} no se encuentra`);
    }
    return alumno;
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.alumnoService.deleteAlumno(id);
  }

  @Put(':id')
  updateAlumno(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    user: UpdateAlumnoDto,
  ) {
    return this.alumnoService.updateAlumno(id, user);
  }
}
