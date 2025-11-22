import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateEntrenadorDto } from './dto/create-entrenador.dto';
import { UpdateEntrenadorDto } from './dto/update-entrenador.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entrenador } from './entities/entrenador.entity';
import { Repository } from 'typeorm';
import { privateDecrypt } from 'crypto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class EntrenadorService {
  constructor(
    @InjectRepository(Entrenador)
    private entrenadorRepository: Repository<Entrenador>,
    private readonly usuarioService: UsuarioService,
  ) {}

  public async createEntrenador(
    Entrenador: CreateEntrenadorDto,
  ): Promise<Entrenador> {
    const usuarioEncontrado: Usuario | null =
      await this.usuarioService.findOneUsuario(Entrenador.idUsuario);
    if (usuarioEncontrado.rol !== 'entrenador') {
      throw new BadRequestException(
        `El usuario no puede ser registrado como entrenador.`,
      );
    } else {
      try {
        const nuevoEntrenador = this.entrenadorRepository.create(Entrenador);
        const entrenadorGuardado =
          this.entrenadorRepository.save(nuevoEntrenador);
        return entrenadorGuardado;
      } catch (error) {
        throw new InternalServerErrorException(
          'Error interno al crear un entrenador',
        );
      }
    }
  }

  public async getEntrenadores(): Promise<Entrenador[]> {
    try {
      const entrenadores = await this.entrenadorRepository.find({
        relations: ['usuario'],
      });

      if (entrenadores.length === 0) {
        throw new HttpException(
          'No hay entrenadores registrados',
          HttpStatus.NOT_FOUND,
        );
      }

      return entrenadores;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Error interno al obtener entrenadores',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getEntrenador(id: number) {
    try {
      const entrenadorEncontrado = await this.entrenadorRepository.findOne({
        where: {
          idEntrenador: id,
        },
        relations: ['usuario'],
      });
      if (!entrenadorEncontrado) {
        throw new HttpException(
          'Entrenador no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }
      return entrenadorEncontrado;
    } catch (error) {
      // Si el error ya es un HttpException (como tu 404), relanzalo
      if (error instanceof HttpException) {
        throw error;
      }

      // Cualquier otro error → 500
      throw new HttpException(
        'Error interno al buscar el entrenador',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async deleteEntrenador(id: number) {
    try {
      const result = await this.entrenadorRepository.delete(id);

      // Si no eliminó ninguna fila → entrenador no existe
      if (result.affected === 0) {
        throw new HttpException(
          `Entrenador con ID ${id} no encontrado`,
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: `Entrenador con ID ${id} eliminado correctamente`,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        `Error al eliminar el entrenador con ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async updateEntrenador(id: number, user: UpdateEntrenadorDto) {
    try {
      // Primero verificamos si existe
      const entrenadorExistente = await this.entrenadorRepository.findOne({
        where: { idEntrenador: id },
      });

      if (!entrenadorExistente) {
        throw new HttpException(
          `Entrenador con ID ${id} no encontrado`,
          HttpStatus.NOT_FOUND,
        );
      }

      // Intentamos actualizar
      const resultado = await this.entrenadorRepository.update(id, user);

      return {
        message: 'Entrenador actualizado correctamente',
        updated: resultado,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Error al actualizar el entrenador ${id}: ${error.message}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
