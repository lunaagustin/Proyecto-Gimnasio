import { IsString, IsInt, IsNotEmpty } from "class-validator";

export class CreateEntrenadorDto {

    @IsString()
    @IsNotEmpty()
    cvCertificacion: string;

    @IsInt()
    idUsuario: number;
}