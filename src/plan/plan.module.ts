import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { Alumno } from '../alumno/entities/alumno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from '../plan/entities/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan,Alumno])],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService]
})
export class PlanModule {}
