import { IsInt, IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class UpdateSerieDto {
    @IsInt()
    @IsNotEmpty()
    @IsOptional()
    repeticiones?: number;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    peso?: number;

    @IsInt()
    @IsNotEmpty()
    @IsOptional()
    descanso?: number;

    @IsInt()
    @IsNotEmpty()
    @IsOptional()
    idEjercicio?: number;
}
