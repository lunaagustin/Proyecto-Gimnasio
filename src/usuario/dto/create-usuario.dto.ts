import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";

export enum Rol {
    ALUMNO= "alumno",
    ENTRENADOR= "entrenador",
    ADMIN= "admin"
}

export class CreateUsuarioDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    nombre:string;

    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @Transform(({value}) => value.trim())
    contraseña:string;

    @IsEnum(Rol)
    rol:Rol;
}
