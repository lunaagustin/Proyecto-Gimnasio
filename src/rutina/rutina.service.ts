import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rutina } from './entities/rutina.entity';
import { CreateRutinaDto } from './dto/create-rutina.dto';
import { UpdateRutinaDto } from './dto/update-rutina.dto';
import { Entrenador } from 'src/entrenador/entities/entrenador.entity';

@Injectable()
export class RutinaService {

  constructor(
    @InjectRepository(Rutina)
    private readonly rutinaRepository: Repository<Rutina>,

    @InjectRepository(Entrenador)
    private readonly entrenadorRepository: Repository<Entrenador>,
  ) {}

  public async findAllRutinas(): Promise<Rutina[]> {
    const rutinas = await this.rutinaRepository.find({
      relations: ['entrenador'],
    });
    return rutinas;
  }

  public async findOneRutina(id: number): Promise<Rutina> {
    let rutina: Rutina | null = await this.rutinaRepository.findOne({
      where: { idRutina: id },
    });
    if (!rutina) {
      throw new NotFoundException('La rutina no se encuentra');
    } else {
      try {
        return rutina;
      } catch (error) {
        throw new InternalServerErrorException(
          'Error interno al encontrar la rutina.',
        );
      }
    }
  }

  public async createRutina(dto: CreateRutinaDto): Promise<Rutina> {
    try {
      // 1. Extraemos el idEntrenador del DTO
      const { idEntrenador, ...data } = dto;

      // 2. Buscar el entrenador
      const entrenador = await this.entrenadorRepository.findOne({
        where: { idEntrenador: idEntrenador },
      });

      if (!entrenador) {
        throw new NotFoundException('Entrenador no encontrado');
      }

      // 3. Crear la rutina y asignar el entrenador
      const nuevaRutina = this.rutinaRepository.create({
        ...data,
        entrenador: entrenador, // <--- acá se une
      });

      // 4. Guardar en la base
      return await this.rutinaRepository.save(nuevaRutina);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error interno al crear la rutina.',
      );
    }
  }

  public async updateRutina(
    id: number,
    rutina: UpdateRutinaDto,
  ): Promise<Rutina> {
    let rutinaId: Rutina | null = await this.rutinaRepository.findOne({
      where: { idRutina: id },
    });
    if (!rutinaId) {
      throw new NotFoundException('No se encuentra la rutina');
    } else {
      try {
        let rutinaActualizada: Rutina = await this.rutinaRepository.save({
          ...rutinaId,
          ...rutina,
        });
        return rutinaActualizada;
      } catch (error) {
        throw new InternalServerErrorException(
          'Error interno al actualizar la rutina.',
        );
      }
    }
  }

  public async deleteRutina(id: number): Promise<boolean> {
    let rutina: Rutina | null = await this.rutinaRepository.findOne({
      where: { idRutina: id },
    });
    if (!rutina) {
      throw new NotFoundException('No se encuentra la rutina');
    } else {
      try {
        await this.rutinaRepository.delete(rutina.idRutina);
        return true;
      } catch (error) {
        throw new InternalServerErrorException(
          'Error interno al borrar la rutina.',
        );
      }
    }
  }
}
