import { PartialType } from '@nestjs/mapped-types';
import { CreateEjercicioDto } from './create-ejercicio.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateEjercicioDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  instrucciones?: string;

  @IsString()
  @IsOptional()
  equipamiento?: string;
}
