import { IsDate, IsInt, IsString } from "class-validator";

export class CreateAsignacionDto {
    @IsInt()
    idAsignacion:number;

    @IsDate()
    fechaAsignada:Date;

    @IsString()
    estado:string;
}
