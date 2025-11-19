import { IsDateString, IsInt, IsNumber, IsOptional, IsString, } from "class-validator";

export class CreateAlumnoDto {

    @IsNumber()
    peso:number;

    @IsNumber()
    altura:number;

    @IsDateString()
    fechaInicio:string;

    @IsString()
    @IsOptional()
    lesiones?:string;

}
