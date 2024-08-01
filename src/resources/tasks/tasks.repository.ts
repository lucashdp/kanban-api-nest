import { Model, FlattenMaps } from 'mongoose';
import { TaskDocument } from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';

export class TaskRepository {
  constructor(
    @InjectModel('Task')
    private readonly model: Model<TaskDocument>
  ) {}

  async findAll(query: any): Promise<FlattenMaps<TaskDocument[]> | null> {
    return this.model.find(query).lean().exec();
  }
}
