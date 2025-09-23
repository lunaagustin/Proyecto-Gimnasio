import { IsInt, IsString } from "class-validator";

export class CreateEntrenadorDto {
    
    @IsString()
    cvCertificacion:string;

    @IsInt()
    idEntrenador:number;

}
