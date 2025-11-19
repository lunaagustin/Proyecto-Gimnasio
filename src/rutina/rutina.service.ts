import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRutinaDto } from './dto/create-rutina.dto';
import { UpdateRutinaDto } from './dto/update-rutina.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rutina } from './entities/rutina.entity';

@Injectable()
export class RutinaService {
  constructor(
    @InjectRepository(Rutina)
    private readonly rutinaRepository: Repository<Rutina>,
  ) {} /* decorador Inject le pasamos la entity*/

  public async createRutina(Rutina: CreateRutinaDto) {
    const newRutina = this.rutinaRepository.create(Rutina);
    return this.rutinaRepository.save(newRutina);
  }

  public async getRutinas(): Promise<Rutina[]> {
  try {
    const rutinas = await this.rutinaRepository.find();

    if (rutinas.length === 0) {
      throw new HttpException('No hay rutinas registradas', HttpStatus.NOT_FOUND);
    }

    return rutinas;

  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }

    throw new HttpException(
      'Error interno al obtener rutinas',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

  public async getRutina(id: number) {
    try {
      const rutinaEncontrada = await this.rutinaRepository.findOne({
        where: {
          idRutina: id,
        },
      });
      if (!rutinaEncontrada) {
        throw new HttpException('Rutina no encontrada', HttpStatus.NOT_FOUND);
      }
      return rutinaEncontrada;
    } catch (error) {
      // Si el error ya es un HttpException (como tu 404), relanzalo
      if (error instanceof HttpException) {
        throw error;
      }

      // Cualquier otro error → 500
      throw new HttpException(
        'Error interno al buscar la rutina',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async deleteRutina(id: number) {
  try {
    const result = await this.rutinaRepository.delete(id);

    // Si no eliminó ninguna fila → rutina no existe
    if (result.affected === 0) {
      throw new HttpException(
        `Rutina con ID ${id} no encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: `Rutina con ID ${id} eliminado correctamente`,
    };

  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }

    throw new HttpException(
      `Error al eliminar la rutina con ID ${id}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

  public async updateRutina(id: number, user: UpdateRutinaDto) {
  try {
    // Primero verificamos si existe
    const rutinaExistente = await this.rutinaRepository.findOne({
      where: { idRutina: id },
    });

    if (!rutinaExistente) {
      throw new HttpException(
        `Rutina con ID ${id} no encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    // Intentamos actualizar
    const resultado = await this.rutinaRepository.update(id, user);

    return {
      message: "Rutina actualizada correctamente",
      updated: resultado,
    };
  } catch (error) {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: `Error al actualizar la rutina ${id}: ${error.message}`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

}
