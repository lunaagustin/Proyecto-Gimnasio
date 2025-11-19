import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(@InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>,) { }

  public async findAllUsuarios(): Promise<Usuario[]> {
    let usuarios: Usuario[] = await this.usuarioRepository.find();
    return usuarios;
  }

  public async findOneUsuario(id: number): Promise<Usuario> {
    try {
      let usuario: Usuario | null = await this.usuarioRepository.findOne({ where: { idUsuario: id } });
      if (usuario) {
        return usuario;
      } else {
        throw new NotFoundException("El usuario no se encuentra");
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error al encontrar el usuario' + id + ' : ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async createUsuario(usuario: CreateUsuarioDto): Promise<Usuario> {
    try {
      let buscarUsuario: Usuario | null = await this.usuarioRepository.findOneBy({ email: usuario.email, });
      if (buscarUsuario) {
        throw new BadRequestException('Ya existe ese usuario con ese email');
      } else {
        let nuevoUsuario: Usuario = await this.usuarioRepository.create(usuario);
        return await this.usuarioRepository.save(nuevoUsuario);
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Error al crear un usuario nuevo' + error
      }, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateUsuario(id: number, usuario: UpdateUsuarioDto): Promise<Usuario> {
    try {
      let usuarioId: Usuario | null = await this.usuarioRepository.findOne({ where: { idUsuario: id } });
      if (!usuarioId) {
        throw new NotFoundException("No se encuentra el usuario");
      } else {
        let usuarioActualizado: Usuario = await this.usuarioRepository.save({
          ...usuarioId,
          usuario,
        });
        return usuarioActualizado;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error al actualizar el usuario' + error
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  public async deleteUsuario(id: number): Promise<boolean> {
    try {
      let usuario: Usuario | null = await this.usuarioRepository.findOne({ where: { idUsuario: id } });
      if (!usuario) {
        throw new NotFoundException("No se encuentra el usuario");
      } else {
        await this.usuarioRepository.delete(usuario)
        return true;
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en la eliminacion del usuario' + error
      }, HttpStatus.NOT_FOUND);
    }
  }
}
