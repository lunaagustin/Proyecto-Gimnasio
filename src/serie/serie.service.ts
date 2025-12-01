import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Serie } from '../serie/entities/serie.entity';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { EjercicioService } from '../ejercicio/ejercicio.service';
import { Ejercicio } from '../ejercicio/entities/ejercicio.entity';

@Injectable()
export class SerieService {
  constructor(@InjectRepository(Serie) 
  private readonly serieRepository: Repository<Serie>,
  private readonly ejercicioService: EjercicioService,
) { }

  public async findAllSeries(): Promise<Serie[]> {
      try {
        const series: Serie[] = await this.serieRepository.find({ relations: ['ejercicio'] });
  
        if (series.length === 0) {
          throw new HttpException('No hay series registradas', HttpStatus.NOT_FOUND);
        }
  
        return series;
  
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }
  
        throw new HttpException(
          'Error interno al obtener series',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

  public async findOneSerie(id: number): Promise<Serie> {
    let serie: Serie | null = await this.serieRepository.findOne({
      where: {
        idSerie: id,
      },
      relations: ['ejercicio'],
    });
    if (!serie) {
      throw new NotFoundException("La serie no se encuentra");
    } else {
      try {
        return serie;
      } catch (error) {
        throw new InternalServerErrorException('Error interno al encontrar la serie.');
      }
    }
  }

  public async createSerie(serie: CreateSerieDto): Promise<Serie> {
    try {
      let ejercicio: Ejercicio | null = await this.ejercicioService.getEjercicio(serie.idEjercicio);
      let nuevaSerie: Serie = await this.serieRepository.create(serie);
      return await this.serieRepository.save(nuevaSerie);
    } catch (error) {
      throw new InternalServerErrorException('Error interno al crear la serie.');
    }
  }

  public async updateSerie(id: number, serie: UpdateSerieDto): Promise<Serie> {
    let serieId: Serie | null = await this.serieRepository.findOne({ where: { idSerie: id } });
    if (!serieId) {
      throw new NotFoundException("No se encuentra la serie");
    } else {
      try {
        let serieActualizada: Serie = await this.serieRepository.save({
          ...serieId,
          ...serie,
        });
        return serieActualizada;
      } catch (error) {
        throw new InternalServerErrorException('Error interno al actualizar la serie.');
      }
    }
  }

  public async deleteSerie(id: number): Promise<boolean> {
    let serie: Serie | null = await this.serieRepository.findOne({ where: { idSerie: id } });
    if (!serie) {
      throw new NotFoundException("No se encuentra la serie");
    } else {
      try {
        await this.serieRepository.delete(serie.idSerie)
        return true;
      } catch (error) {
        throw new InternalServerErrorException('Error interno al borrar la serie.');
      }
    }
  }
}
