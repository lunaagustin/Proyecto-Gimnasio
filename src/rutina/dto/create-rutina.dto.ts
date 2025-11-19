import { IsString, IsInt, IsOptional, IsNotEmpty, MinLength } from "class-validator";

export class CreateRutinaDto {

    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsInt()
    @IsNotEmpty()
    idEntrenador: number;
}
