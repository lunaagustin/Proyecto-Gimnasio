import { Transform } from "class-transformer";
import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreatePlanDto {

    @IsString()
    @IsNotEmpty()
    @Transform(({value}) => value.trim())
    tipo: string;

    @IsNumber()
    @IsNotEmpty()
    precio: number;
}
