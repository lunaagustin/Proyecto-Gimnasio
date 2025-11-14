import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  create(@Body() plan: CreatePlanDto) {
    return this.planService.createPlan(plan);
  }

  @Get()
  findAllPlanes() {
    return this.planService.findAllPlanes();
  }

  @Get(':id')
  findOnePlan(@Param('id') id: number) {
    return this.planService.findOnePlan(+id);
  }

  @Put(':id')
  updatePlan(@Param('id') id: number, @Body() plan: UpdatePlanDto) {
    return this.planService.updatePlan(+id, plan);
  }

  @Delete(':id')
  deletePlan(@Param('id') id: number) {
    return this.planService.deletePlan(+id);
  }
}
