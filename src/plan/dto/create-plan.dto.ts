import { IsInt, IsString } from "class-validator";

export class CreatePlanDto {

    @IsInt()
    idPlan:number;

    @IsString()
    tipo:string;

    @IsInt()
    precio:number;
}
