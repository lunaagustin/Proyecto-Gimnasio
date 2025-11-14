import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdatePlanDto{
    @IsString()
    @IsNotEmpty()
    @Transform(({value}) => value.trim())
    @IsOptional()
    tipo?: string;
    
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    precio?: number;
}
