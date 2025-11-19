import { PartialType } from '@nestjs/mapped-types';
import { CreateEntrenadorDto } from './create-entrenador.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateEntrenadorDto {
  @IsString()
  @IsOptional()
  cvCertificacion?: string;
}
