import { IsNumber, IsInt, IsNotEmpty } from "class-validator";

export class CreateSerieDto {

    @IsInt()
    @IsNotEmpty()
    repeticiones: number;

    @IsNumber()
    @IsNotEmpty()
    peso: number;

    @IsInt()
    @IsNotEmpty()
    descanso: number;

    @IsInt()
    @IsNotEmpty()
    idEjercicio: number;
}
