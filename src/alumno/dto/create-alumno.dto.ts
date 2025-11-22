import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, } from "class-validator";

export class CreateAlumnoDto {

    @IsNumber()
    peso: number;

    @IsNumber()
    altura: number;

    @IsDateString()
    fechaInicio: string;

    @IsString()
    @IsOptional()
    lesiones?: string;

    @IsNumber()
    @IsNotEmpty()
    idUsuario: number

    @IsInt()
    @IsNotEmpty()
    idEntrenador: number

    @IsInt()
    @IsNotEmpty()
    idPlan: number
}
