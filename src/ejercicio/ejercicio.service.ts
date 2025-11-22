import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEjercicioDto } from './dto/create-ejercicio.dto';
import { UpdateEjercicioDto } from './dto/update-ejercicio.dto';
import { Ejercicio } from './entities/ejercicio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntrenadorService } from 'src/entrenador/entrenador.service';
import { Entrenador } from 'src/entrenador/entities/entrenador.entity';

@Injectable()
export class EjercicioService {
  constructor(
    @InjectRepository(Ejercicio)
    private readonly ejercicioRepository: Repository<Ejercicio>,
    private readonly entrenadorService: EntrenadorService,
  ) { } /* decorador Inject le pasamos la entity*/

  public async createEjercicio(ejercicio: CreateEjercicioDto): Promise<Ejercicio> {
    try {
      let buscarEjercicio: Ejercicio | null = await this.ejercicioRepository.findOneBy({ nombre: ejercicio.nombre, });
      if (buscarEjercicio) {
        throw new BadRequestException('Ya existe un ejercicio con ese nombre');
      }
      let entrenadorEncontrado: Entrenador | null = await this.entrenadorService.getEntrenador(ejercicio.idEntrenador);
      let nuevoEjercicio: Ejercicio = this.ejercicioRepository.create(ejercicio);
      return await this.ejercicioRepository.save(nuevoEjercicio);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error interno al crear ejercicio nuevo' + error
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getEjercicios(): Promise<Ejercicio[]> {
    try {
      const ejercicios = await this.ejercicioRepository.find({
        relations: ['entrenador'],
      });
      if (ejercicios.length === 0) {
        throw new HttpException(
          'No hay ejercicios registrados',
          HttpStatus.NOT_FOUND,
        );
      }

      return ejercicios;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Error interno al obtener ejercicios',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getEjercicio(id: number) {
    try {
      const ejercicioEncontrado = await this.ejercicioRepository.findOne({
        where: {
          idEjercicio: id,
        },
        relations: ['entrenador'],
      });
      if (!ejercicioEncontrado) {
        throw new HttpException(
          'Ejercicio no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }
      return ejercicioEncontrado;
    } catch (error) {
      // Si el error ya es un HttpException (como tu 404), relanzalo
      if (error instanceof HttpException) {
        throw error;
      }

      // Cualquier otro error → 500
      throw new HttpException(
        'Error interno al buscar el ejercicio',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async deleteEjercicio(id: number) {
    try {
      const result = await this.ejercicioRepository.delete(id);

      // Si no eliminó ninguna fila → ejercicio no existe
      if (result.affected === 0) {
        throw new HttpException(
          `Ejercicio con ID ${id} no encontrado`,
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: `Ejercicio con ID ${id} eliminado correctamente`,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        `Error al eliminar el ejercicio con ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async updateEjercicio(id: number, user: UpdateEjercicioDto) {
    try {
      // Primero verificamos si existe
      const ejercicioExistente = await this.ejercicioRepository.findOne({
        where: { idEjercicio: id },
      });

      if (!ejercicioExistente) {
        throw new HttpException(
          `Ejercicio con ID ${id} no encontrado`,
          HttpStatus.NOT_FOUND,
        );
      }

      // Intentamos actualizar
      const resultado = await this.ejercicioRepository.update(id, user);

      return {
        message: 'Ejercicio actualizado correctamente',
        updated: resultado,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Error al actualizar el ejercicio ${id}: ${error.message}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
