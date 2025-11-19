import { IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateRutinaDto {
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    @IsOptional()
    nombre?: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    descripcion?: string;
    
    @IsInt()
    @IsOptional()
    idEntrenador?: number;
}
