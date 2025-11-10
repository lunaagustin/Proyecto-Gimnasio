import { IsString, IsInt } from "class-validator";

export class CreateEntrenadorDto {

    @IsString()
    cvCertificacion: string;

    @IsInt()
    idUsuario: number;
}
