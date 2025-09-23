import { IsString } from "class-validator";

export class CreateUsuarioDto {

    @IsString()
    nombre:string;

    @IsString()
    email:string;

    @IsString()
    rol:string;
}
