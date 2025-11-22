import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumno } from './entities/alumno.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Entrenador } from 'src/entrenador/entities/entrenador.entity';
import { Plan } from 'src/plan/entities/plan.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { EntrenadorService } from 'src/entrenador/entrenador.service';
import { PlanService } from 'src/plan/plan.service';

@Injectable()
export class AlumnoService {
  constructor(
    @InjectRepository(Alumno)
    private readonly alumnoRepository: Repository<Alumno>,
    private readonly usuarioService: UsuarioService,
    private readonly entrenadorService: EntrenadorService,
    private readonly planService: PlanService,
  ) { } /* decorador Inject le pasamos la entity*/

  public async createAlumno(alumno: CreateAlumnoDto): Promise<Alumno> {
      const usuarioEncontrado: Usuario | null = await this.usuarioService.findOneUsuario(alumno.idUsuario);
      const entrenadorEncontrado: Entrenador | null = await this.entrenadorService.getEntrenador(alumno.idEntrenador);
      const planEncontrado: Plan | null = await this.planService.findOnePlan(alumno.idPlan);
      if (usuarioEncontrado.rol !== "alumno") {
        throw new BadRequestException(`El usuario no puede ser registrado como alumno.`);
      } else {
        try {
          const nuevoAlumno = this.alumnoRepository.create(alumno);
          const alumnoGuardado = this.alumnoRepository.save(nuevoAlumno);
          return alumnoGuardado;
        } catch (error) {
          throw new InternalServerErrorException("Error interno al crear un alumno")
        }
      }
  }

  public async getAlumnos(): Promise<Alumno[]> {
    try {
      const alumnos = await this.alumnoRepository.find({ relations: ["usuario", "entrenador", "plan"] });

      if (alumnos.length === 0) {
        throw new HttpException('No hay alumnos registrados', HttpStatus.NOT_FOUND);
      }

      return alumnos;

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Error interno al obtener alumnos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAlumno(id: number) {
    try {
      const alumnoEncontrado = await this.alumnoRepository.findOne({
        where: {
          idAlumno: id,
        },
      });
      if (!alumnoEncontrado) {
        throw new HttpException('Alumno no encontrado', HttpStatus.NOT_FOUND);
      }
      return alumnoEncontrado;
    } catch (error) {
      // Si el error ya es un HttpException (como tu 404), relanzalo
      if (error instanceof HttpException) {
        throw error;
      }

      // Cualquier otro error → 500
      throw new HttpException(
        'Error interno al buscar el alumno',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async deleteAlumno(id: number) {
    try {
      const result = await this.alumnoRepository.delete(id);

      // Si no eliminó ninguna fila → alumno no existe
      if (result.affected === 0) {
        throw new HttpException(
          `Alumno con ID ${id} no encontrado`,
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: `Alumno con ID ${id} eliminado correctamente`,
      };

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        `Error al eliminar el alumno con ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async updateAlumno(id: number, user: UpdateAlumnoDto) {
    try {
      // Primero verificamos si existe
      const alumnoExistente = await this.alumnoRepository.findOne({
        where: { idAlumno: id },
      });

      if (!alumnoExistente) {
        throw new HttpException(
          `Alumno con ID ${id} no encontrado`,
          HttpStatus.NOT_FOUND,
        );
      }

      // Intentamos actualizar
      const resultado = await this.alumnoRepository.update(id, user);

      return {
        message: "Alumno actualizado correctamente",
        updated: resultado,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Error al actualizar el alumno ${id}: ${error.message}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
