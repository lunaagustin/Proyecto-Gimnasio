import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';
import { Asignacion } from './entities/asignacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AsignacionService {
  constructor(
    @InjectRepository(Asignacion)
    private readonly asignacionRepository: Repository<Asignacion>,
  ) {} /* decorador Inject le pasamos la entity*/

  public async createAsignacion(Asignacion: CreateAsignacionDto) {
    const newAsignacion = this.asignacionRepository.create(Asignacion);
    return this.asignacionRepository.save(newAsignacion);
  }

  public async getAsignaciones(): Promise<Asignacion[]> {
    try {
      const asignaciones = await this.asignacionRepository.find();

      if (asignaciones.length === 0) {
        throw new HttpException('No hay asignaciones', HttpStatus.NOT_FOUND);
      }

      return asignaciones;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Error interno al obtener asignaciones',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAsignacion(id: number) {
    try {
      const asignacionEncontrada = await this.asignacionRepository.findOne({
        where: {
          idAsignacion: id,
        },
      });
      if (!asignacionEncontrada) {
        throw new HttpException(
          'Asignacion no encontrada',
          HttpStatus.NOT_FOUND,
        );
      }
      return asignacionEncontrada;
    } catch (error) {
      // Si el error ya es un HttpException (como tu 404), relanzalo
      if (error instanceof HttpException) {
        throw error;
      }

      // Cualquier otro error → 500
      throw new HttpException(
        'Error interno al buscar asignacion',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async deleteAsignacion(id: number) {
    try {
      const result = await this.asignacionRepository.delete(id);

      if (result.affected === 0) {
        throw new HttpException(
          `Asignacion con ID ${id} no encontrado`,
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: `Asignacion con ID ${id} eliminado correctamente`,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        `Error al eliminar la asignacion con ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async updateAsignacion(id: number, user: UpdateAsignacionDto) {
    try {
      // Primero verificamos si existe
      const asignacionExistente = await this.asignacionRepository.findOne({
        where: { idAsignacion: id },
      });

      if (!asignacionExistente) {
        throw new HttpException(
          `Asignacion con ID ${id} no encontrada`,
          HttpStatus.NOT_FOUND,
        );
      }

      // Intentamos actualizar
      const resultado = await this.asignacionRepository.update(id, user);

      return {
        message: 'Asignacion actualizada correctamente',
        updated: resultado,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Error al actualizar la asignacion${id}: ${error.message}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
