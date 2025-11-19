import { PartialType } from '@nestjs/mapped-types';
import { CreateRutinaDto } from './create-rutina.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRutinaDto extends PartialType(CreateRutinaDto) {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
