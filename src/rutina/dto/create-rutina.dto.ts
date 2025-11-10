import { IsString, IsInt } from "class-validator";

export class CreateRutinaDto {

    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;

    @IsInt()
    idEntrenador: number;
}
