import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { SerieService } from './serie.service';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';

@Controller('serie')
export class SerieController {
  constructor(private readonly serieService: SerieService) { }

  @Post()
  async createSerie(@Body() serie: CreateSerieDto) {
    return this.serieService.createSerie(serie);
  }

  @Get()
  async findAllSeries() {
    return this.serieService.findAllSeries();
  }

  @Get(':id')
  async findOneSerie(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),) id: number) {
    return this.serieService.findOneSerie(+id);
  }

  @Put(':id')
  async updateSerie(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),) id: number,
    @Body() serie: UpdateSerieDto) {
    return this.serieService.updateSerie(+id, serie);
  }

  @Delete(':id')
  async deleteSerie(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),) id: number) {
    return this.serieService.deleteSerie(+id);
  }
}