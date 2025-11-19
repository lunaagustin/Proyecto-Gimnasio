import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post()
  async createUsuario(@Body() usuario: CreateUsuarioDto) {
    return this.usuarioService.createUsuario(usuario);
  }

  @Put(':id')
  async updateUsuario(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}),)id:number, 
  @Body() usuario:UpdateUsuarioDto):Promise<Usuario>{
    return this.usuarioService.updateUsuario(id,usuario)
  }

  @Get()
  async findAllUsuarios() {
    return this.usuarioService.findAllUsuarios();
  }

  @Get(':id')
  async findOneUsuario(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}),)id: number) {
    return this.usuarioService.findOneUsuario(+id);
  }

  @Delete(':id')
  async deleteUsuario(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}),) id: number) {
    return this.usuarioService.deleteUsuario(+id);
  }
}
