import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumno } from './entities/alumno.entity';

@Injectable()
export class AlumnoService {
  constructor(
    @InjectRepository(Alumno)
    private readonly alumnoRepository: Repository<Alumno>,
  ) {} /* decorador Inject le pasamos la entity*/

  public async createAlumno(Alumno: CreateAlumnoDto) {
    const newAlumno = this.alumnoRepository.create(Alumno);
    return this.alumnoRepository.save(newAlumno);
  }

  public async getAlumnos(): Promise<Alumno[]> {
  try {
    const alumnos = await this.alumnoRepository.find();

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
