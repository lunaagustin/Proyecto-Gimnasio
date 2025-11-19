
import { IsDateString, IsInt, IsNumber, IsOptional, IsString, } from "class-validator";

export class UpdateAlumnoDto {
  @IsNumber()
  @IsOptional()
  peso?: number;

  @IsNumber()
  @IsOptional()
  altura?: number;

  @IsDateString()
  @IsOptional()
  fechaInicio?: string;

  @IsString()
  @IsOptional()
  lesiones?: string;
}

