import { IsString, IsNumber } from "class-validator";

export class CreatePlanDto {

    @IsString()
    tipo: string;

    @IsNumber()
    precio: number;
}
