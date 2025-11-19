import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './entities/plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlanService {
  constructor(@InjectRepository(Plan) private readonly planRepository: Repository<Plan>,) { }

  public async findAllPlanes(): Promise<Plan[]> {
    let planes: Plan[] = await this.planRepository.find();
    return planes;
  }

  public async findOnePlan(id: number): Promise<Plan> {
    let plan: Plan | null = await this.planRepository.findOne({ where: { idPlan: id } });
    if (!plan) {
      throw new NotFoundException("El plan no se encuentra");
    } else {
      try {
        return plan;
      } catch (error) {
        throw new InternalServerErrorException('Error interno al encontrar el plan.');
      }
    }
  }

  public async createPlan(plan: CreatePlanDto): Promise<Plan> {
    try {
      let nuevoPlan: Plan = await this.planRepository.create(plan);
      return await this.planRepository.save(nuevoPlan);
    } catch (error) {
      throw new InternalServerErrorException('Error interno al crear el plan.');
    }
  }

  public async updatePlan(id: number, plan: UpdatePlanDto): Promise<Plan> {
    let planId: Plan | null = await this.planRepository.findOne({ where: { idPlan: id } });
    if (!planId) {
      throw new NotFoundException("No se encuentra el plan");
    } else {
      try {
        let planActualizado: Plan = await this.planRepository.save({
          ...planId,
          ...plan,
        });
        return planActualizado;
      } catch (error) {
        throw new InternalServerErrorException('Error interno al actualizar el plan.');
      }
    }
  }

  public async deletePlan(id: number): Promise<boolean> {
    let plan: Plan | null = await this.planRepository.findOne({ where: { idPlan: id } });
    if (!plan) {
      throw new NotFoundException("No se encuentra el plan");
    } else {
      try {
        await this.planRepository.delete(plan.idPlan)
        return true;
      } catch (error) {
        throw new InternalServerErrorException('Error interno al borrar el plan.');
      }
    }
  }
}
