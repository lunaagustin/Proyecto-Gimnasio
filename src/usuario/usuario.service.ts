import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
    let usuario: Usuario | null = await this.usuarioRepository.findOne({ where: { idUsuario: id } });
    if (!usuario) {
      throw new NotFoundException("El usuario no se encuentra");
    } else {
      try {
        return usuario;
      } catch (error) {
        throw new InternalServerErrorException('Error interno al encontrar el usuario.');
      }
    }
  }

  public async createUsuario(usuario: CreateUsuarioDto): Promise<Usuario> {
    let buscarUsuario: Usuario | null = await this.usuarioRepository.findOneBy({ email: usuario.email, });
    if (buscarUsuario) {
      throw new BadRequestException('Ya existe ese usuario con ese email');
    } else {
      try {
        let nuevoUsuario: Usuario = await this.usuarioRepository.create(usuario);
        return await this.usuarioRepository.save(nuevoUsuario);
      } catch (error) {
        throw new InternalServerErrorException('Error interno al crear un usuario.');
      }
    }
  }

  public async updateUsuario(id: number, usuario: UpdateUsuarioDto): Promise<Usuario> {
    let usuarioId: Usuario | null = await this.usuarioRepository.findOne({ where: { idUsuario: id } });
    if (!usuarioId) {
      throw new NotFoundException("No se encuentra el usuario");
    } else {
      try {
        let usuarioActualizado: Usuario = await this.usuarioRepository.save({
          ...usuarioId,
          ...usuario,
        });
        return usuarioActualizado;
      } catch (error) {
        throw new InternalServerErrorException('Error interno al actualizar el usuario.');
      }
    }
  }

  public async deleteUsuario(id: number): Promise<boolean> {
    let usuario: Usuario | null = await this.usuarioRepository.findOne({ where: { idUsuario: id } });
    if (!usuario) {
      throw new NotFoundException("No se encuentra el usuario");
    } else {
      try {
        await this.usuarioRepository.delete(usuario.idUsuario)
        return true;
      } catch (error) {
        throw new InternalServerErrorException('Error interno al borrar el usuario.');
      }
    }
  }
}