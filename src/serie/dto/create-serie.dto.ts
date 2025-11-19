import { IsNumber, IsInt } from "class-validator";

export class CreateSerieDto {

    @IsInt()
    repeticiones: number;

    @IsNumber()
    peso: number;

    @IsInt()
    descanso: number;

   /* @IsInt()
    idEjercicio: number;*/
}
