import { IsDateString, IsInt, IsString } from "class-validator";

export class CreateAsignacionDto {

    @IsDateString()
    fechaAsignada: string;

    @IsString()
    estado: string;

    /*@IsInt()
    idRutina: number;

    @IsInt()
    idAlumno: number;*/
}
