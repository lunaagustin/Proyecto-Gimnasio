import { IsString, IsInt } from "class-validator";

export class CreateEjercicioDto {

    @IsString()
    nombre: string;

    @IsString()
    instrucciones: string;

    @IsString()
    equipamiento: string;

    @IsInt()
    idEntrenador: number;
}
