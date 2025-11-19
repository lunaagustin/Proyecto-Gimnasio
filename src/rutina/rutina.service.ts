import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rutina } from './entities/rutina.entity';
import { CreateRutinaDto } from './dto/create-rutina.dto';
import { UpdateRutinaDto } from './dto/update-rutina.dto';

@Injectable()
export class RutinaService {
  constructor(@InjectRepository(Rutina) private readonly rutinaRepository: Repository<Rutina>,) { }

  public async findAllRutinas(): Promise<Rutina[]> {
    let rutinas: Rutina[] = await this.rutinaRepository.find();
    return rutinas;
  }

  public async findOneRutina(id: number): Promise<Rutina> {
    let rutina: Rutina | null = await this.rutinaRepository.findOne({ where: { idRutina: id } });
    if (!rutina) {
      throw new NotFoundException("La rutina no se encuentra");
    } else {
      try {
        return rutina;
      } catch (error) {
        throw new InternalServerErrorException('Error interno al encontrar la rutina.');
      }
    }
  }
  
  public async createRutina(rutina: CreateRutinaDto): Promise<Rutina> {
    try {
      let nuevaRutina: Rutina = await this.rutinaRepository.create(rutina);
      return await this.rutinaRepository.save(nuevaRutina);
    } catch (error) {
      throw new InternalServerErrorException('Error interno al crear la rutina.');
    }
  }

  public async updateRutina(id: number, rutina: UpdateRutinaDto): Promise<Rutina> {
    let rutinaId: Rutina | null = await this.rutinaRepository.findOne({ where: { idRutina: id } });
    if (!rutinaId) {
      throw new NotFoundException("No se encuentra la rutina");
    } else {
      try {
        let rutinaActualizada: Rutina = await this.rutinaRepository.save({
          ...rutinaId,
          ...rutina,
        });
        return rutinaActualizada;
      } catch (error) {
        throw new InternalServerErrorException('Error interno al actualizar la rutina.');
      }
    }
  }

  public async deleteRutina(id: number): Promise<boolean> {
    let rutina: Rutina | null = await this.rutinaRepository.findOne({ where: { idRutina: id } });
    if (!rutina) {
      throw new NotFoundException("No se encuentra la rutina");
    } else {
      try {
        await this.rutinaRepository.delete(rutina.idRutina)
        return true;
      } catch (error) {
        throw new InternalServerErrorException('Error interno al borrar la rutina.');
      }
    }
  }
}
