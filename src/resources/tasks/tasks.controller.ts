import { Controller, Get, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiResponse({
    description: 'Bad request',
    status: HttpStatus.BAD_REQUEST
  })
  @ApiResponse({
    description: 'Internal server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR
  })
  @ApiResponse({
    description: 'Tasks found',
    status: HttpStatus.OK
  })
  findAll() {
    return this.tasksService.findAll({});
  }
}
