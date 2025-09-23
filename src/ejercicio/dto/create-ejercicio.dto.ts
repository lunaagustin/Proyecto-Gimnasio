import { IsInt, IsString } from "class-validator";

export class CreateEjercicioDto {
    @IsInt()
    idEjercicio:number;

    @IsString()
    nombre:string;

    @IsString()
    instrucciones:string;

    @IsString()
    equipamiento:string;
}
