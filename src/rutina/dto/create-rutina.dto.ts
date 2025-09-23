import { IsInt, IsString } from "class-validator";

export class CreateRutinaDto {
    @IsInt()
    idRutina:number;

    @IsString()
    nombre:string;

    @IsString()
    descripcion:string;
}
