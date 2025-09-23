import { IsDecimal, IsInt } from "class-validator";

export class CreateSerieDto {
    @IsInt()
    idSerie:number;

    @IsInt()
    repeticiones:number;

    @IsDecimal()
    peso:number;

    @IsInt()
    descanso:number;
}
