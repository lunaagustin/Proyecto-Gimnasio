import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export enum Rol {
    ALUMNO= "alumno",
    ENTRENADOR= "entrenador",
    ADMIN= "admin"
}

export class UpdateUsuarioDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    nombre?:string;
    
    @IsString()
    @IsEmail()
    @IsOptional()
    email?:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @Transform(({value}) => value.trim())
    @IsOptional()
    contraseña?:string;
    
    @IsEnum(Rol)
    @IsOptional()
    rol?:Rol;
}
