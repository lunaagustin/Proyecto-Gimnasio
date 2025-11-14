import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      let plan: Plan | null = await this.planRepository.findOne({ where: { idPlan: id } });
      if (plan) {
        return plan;
      } else {
        throw new NotFoundException("El plan no se encuentra");
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error al encontrar el plan' + id + ' : ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async createPlan(plan: CreatePlanDto): Promise<Plan> {
    try {
      let nuevoPlan: Plan = await this.planRepository.create(plan);
      return await this.planRepository.save(nuevoPlan);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Error al crear un plan nuevo' + error
      }, HttpStatus.BAD_REQUEST);
    }
  }

  public async updatePlan(id: number, plan: UpdatePlanDto): Promise<Plan> {
    try {
      let planId: Plan | null = await this.planRepository.findOne({ where: { idPlan: id } });
      if (!planId) {
        throw new NotFoundException("No se encuentra el plan");
      } else {
        let planActualizado: Plan = await this.planRepository.save({
          ...planId,
          plan,
        });
        return planActualizado;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error al actualizar el plan' + error
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  public async deletePlan(id: number): Promise<boolean> {
    try {
      let plan: Plan | null = await this.planRepository.findOne({ where: { idPlan: id } });
      if (!plan) {
        throw new NotFoundException("No se encuentra el plan");
      } else {
        await this.planRepository.delete(plan)
        return true;
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en la eliminacion del plan' + error
      }, HttpStatus.NOT_FOUND);
    }
  }
}
