import { IsDate, IsDecimal, IsInt, IsString, } from "class-validator";

export class CreateAlumnoDto {

    @IsInt()
    idAlumno:number

    @IsDecimal()
    peso:number;

    @IsDecimal()
    altura:number;

    @IsDate()
    fechaInicio:Date;

    @IsString()
    lesiones:string;

}
