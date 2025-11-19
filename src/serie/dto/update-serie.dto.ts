import { PartialType } from '@nestjs/mapped-types';
import { CreateSerieDto } from './create-serie.dto';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class UpdateSerieDto extends PartialType(CreateSerieDto) {
  @IsInt()
  @IsOptional()
  repeticiones?: number;

  @IsNumber()
  @IsOptional()
  peso?: number;

  @IsInt()
  @IsOptional()
  descanso?: number;
}
