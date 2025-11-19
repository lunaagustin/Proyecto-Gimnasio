import { PartialType } from '@nestjs/mapped-types';
import { CreateEntrenadorDto } from './create-entrenador.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateEntrenadorDto extends PartialType(CreateEntrenadorDto) {
       @IsString()
       @IsOptional()
        cvCertificacion?: string;
}
