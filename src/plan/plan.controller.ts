import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  async create(@Body() plan: CreatePlanDto) {
    return this.planService.createPlan(plan);
  }

  @Get()
  async findAllPlanes() {
    return this.planService.findAllPlanes();
  }

  @Get(':id')
  async findOnePlan(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}),) id: number) {
    return this.planService.findOnePlan(+id);
  }

  @Put(':id')
  async updatePlan(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}),) id: number, 
  @Body() plan: UpdatePlanDto) {
    return this.planService.updatePlan(+id, plan);
  }

  @Delete(':id')
  async deletePlan(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}),) id: number) {
    return this.planService.deletePlan(+id);
  }
}
