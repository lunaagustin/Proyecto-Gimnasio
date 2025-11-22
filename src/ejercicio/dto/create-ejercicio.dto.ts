import { IsString, IsInt, IsNotEmpty } from "class-validator";

export class CreateEjercicioDto {

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    instrucciones: string;

    @IsString()
    @IsNotEmpty()
    equipamiento: string;

    @IsInt()
    @IsNotEmpty()
    idEntrenador: number;
}
