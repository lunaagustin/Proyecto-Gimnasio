import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Serie } from './entities/serie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SerieService {
  constructor(
    @InjectRepository(Serie)
    private readonly SerieRepository: Repository<Serie>,
  ) {} /* decorador Inject le pasamos la entity*/

  public async createSerie(Serie: CreateSerieDto) {
    const newSerie = this.SerieRepository.create(Serie);
    return this.SerieRepository.save(newSerie);
  }

  public async getSeries(): Promise<Serie[]> {
  try {
    const Series = await this.SerieRepository.find();

    if (Series.length === 0) {
      throw new HttpException('No hay Series registrados', HttpStatus.NOT_FOUND);
    }

    return Series;

  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }

    throw new HttpException(
      'Error interno al obtener Series',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

  public async getSerie(id: number) {
    try {
      const SerieEncontrado = await this.SerieRepository.findOne({
        where: {
          idSerie: id,
        },
      });
      if (!SerieEncontrado) {
        throw new HttpException('Serie no encontrado', HttpStatus.NOT_FOUND);
      }
      return SerieEncontrado;
    } catch (error) {
      // Si el error ya es un HttpException (como tu 404), relanzalo
      if (error instanceof HttpException) {
        throw error;
      }

      // Cualquier otro error → 500
      throw new HttpException(
        'Error interno al buscar el Serie',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async deleteSerie(id: number) {
  try {
    const result = await this.SerieRepository.delete(id);

    // Si no eliminó ninguna fila → Serie no existe
    if (result.affected === 0) {
      throw new HttpException(
        `Serie con ID ${id} no encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: `Serie con ID ${id} eliminado correctamente`,
    };

  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }

    throw new HttpException(
      `Error al eliminar el Serie con ID ${id}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

  public async updateSerie(id: number, user: UpdateSerieDto) {
  try {
    // Primero verificamos si existe
    const SerieExistente = await this.SerieRepository.findOne({
      where: { idSerie: id },
    });

    if (!SerieExistente) {
      throw new HttpException(
        `Serie con ID ${id} no encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    // Intentamos actualizar
    const resultado = await this.SerieRepository.update(id, user);

    return {
      message: "Serie actualizado correctamente",
      updated: resultado,
    };
  } catch (error) {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: `Error al actualizar el Serie ${id}: ${error.message}`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

}
