import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { SerieService } from './serie.service';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import {Serie} from './entities/serie.entity'

@Controller('serie')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}

   @Post()
    async create(@Body() Serie: CreateSerieDto) {
      return this.serieService.createSerie(Serie);
    }

  
    @Get()
    async getSeries() {
      return this.serieService.getSeries();
    }
  
    @Get(':id')
    async getSerie(@Param('id', ParseIntPipe) id: number): Promise<Serie> {
      /*con parseIntPipe cambiamos de string a number*/
      const Serie = await this.serieService.getSerie(id);
      if (!Serie) {
        throw new NotFoundException(`Serie con id ${id} no se encuentra`);
      }
      return Serie;
    }
  
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
      return this.serieService.deleteSerie(id);
    }
  
    @Put(':id')
    updateSerie(
      @Param('id', ParseIntPipe) id: number,
      @Body()
      user: UpdateSerieDto,
    ) {
      return this.serieService.updateSerie(id, user);
    }

}
