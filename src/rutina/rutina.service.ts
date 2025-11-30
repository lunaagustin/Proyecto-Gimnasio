import {
  BadRequestException,
  HttpException,
  HttpStatus,
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
import { Ejercicio } from 'src/ejercicio/entities/ejercicio.entity';
import { Asignacion } from 'src/asignacion/entities/asignacion.entity';

@Injectable()
export class RutinaService {
  constructor(
    @InjectRepository(Rutina)
    private readonly rutinaRepository: Repository<Rutina>,

    @InjectRepository(Entrenador)
    private readonly entrenadorRepository: Repository<Entrenador>,

    @InjectRepository(Ejercicio)
    private readonly ejercicioRepository: Repository<Ejercicio>,

    @InjectRepository(Asignacion)
private readonly asignacionRepository: Repository<Asignacion>,

  ) {}


  public async findAllRutinas(): Promise<Rutina[]> {
    try {
      const rutinas = await this.rutinaRepository.find({
        relations: ['entrenador', 'ejercicios'],
      });

      if (rutinas.length === 0) {
        throw new HttpException(
          'No hay rutinas registradas',
          HttpStatus.NOT_FOUND,
        );
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

  public async findOneRutina(id: number): Promise<Rutina> {
    let rutina: Rutina | null = await this.rutinaRepository.findOne({
      where: { idRutina: id },
      relations: ['entrenador', 'ejercicios'],
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

  public async agregarEjercicios(idRutina: number, ids: number[]) {
    // 1. Verificar que la rutina exista
    const rutina = await this.rutinaRepository.findOne({
      where: { idRutina },
      relations: ['ejercicios'], // 👈 importante para que traiga ejercicios actuales
    });

    if (!rutina) {
      throw new NotFoundException('Rutina no encontrada');
    }

    // 2. Buscar los ejercicios por los IDs recibidos
    const ejercicios = await this.ejercicioRepository.findByIds(ids);

    if (ejercicios.length !== ids.length) {
      throw new BadRequestException('Uno o más ejercicios no existen');
    }

    // 3. Agregar ejercicios a la rutina
    rutina.ejercicios = [...rutina.ejercicios, ...ejercicios];

    // 4. Guardar rutina actualizada
    return await this.rutinaRepository.save(rutina);
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
  const rutina = await this.rutinaRepository.findOne({
    where: { idRutina: id },
    relations: ['ejercicios', 'asignaciones'], 
  });

  if (!rutina) throw new NotFoundException('No se encuentra la rutina');

  try {
    // 1️⃣ Vaciar relación ManyToMany con ejercicios
    rutina.ejercicios = [];
    await this.rutinaRepository.save(rutina);

    // 2️⃣ Eliminar asignaciones relacionadas (OneToMany)
    if (rutina.asignaciones.length > 0) {
      const asignacionesIds = rutina.asignaciones.map(a => a.idAsignacion);
      await this.asignacionRepository.delete(asignacionesIds);
    }

    // 3️⃣ Finalmente borrar la rutina
    await this.rutinaRepository.delete(rutina.idRutina);

    return true;
  } catch (error) {
    console.error(error);
    throw new InternalServerErrorException(
      'Error interno al borrar la rutina.',
    );
  }
}

}
