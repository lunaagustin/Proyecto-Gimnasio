import { IsEnum, IsString } from "class-validator";

export enum Rol {
    ALUMNO= "alumno",
    ENTRENADOR= "entrenador",
    ADMIN= "admin"
}

export class CreateUsuarioDto {

    @IsString()
    nombre:string;

    @IsString()
    email:string;

    @IsEnum(Rol)
    rol:Rol;
}
