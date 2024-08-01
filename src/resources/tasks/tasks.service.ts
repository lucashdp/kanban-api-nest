import { Injectable } from '@nestjs/common';
import { TaskRepository } from './tasks.repository';
import { TaskDocument } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async findAll(
    query: Partial<TaskDocument>
  ): Promise<{ tasks: TaskDocument[]; summary: any } | null> {
    const tasks = await this.taskRepository.findAll(query);

    if (!tasks) {
      return null;
    }

    // Cálculo de processamento: contagem de tarefas por status
    const statusCount = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});

    // Retornar as tarefas e o resumo do processamento
    return { tasks, summary: { statusCount } };
  }
}
