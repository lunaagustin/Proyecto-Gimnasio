import { PartialType } from '@nestjs/mapped-types';
import { CreateAsignacionDto } from './create-asignacion.dto';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateAsignacionDto extends PartialType(CreateAsignacionDto) {

    @IsDateString()
    @IsOptional()
    fechaAsignada?: string;

    @IsString()
    @IsOptional()
    estado?: string;
}




