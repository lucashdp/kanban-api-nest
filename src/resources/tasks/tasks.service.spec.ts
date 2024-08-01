import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './tasks.repository';
import { TaskDocument } from './entities/task.entity';
import { mongo, ObjectId } from 'mongoose';

const mockTaskRepository = () => ({
  findAll: jest.fn()
});

describe('TasksService', () => {
  let service: TasksService;
  let repository: ReturnType<typeof mockTaskRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository }
      ]
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get(TaskRepository);
  });

  it('should return tasks and summary', async () => {
    const mockTasks: TaskDocument[] = [
      {
        _id: new mongo.ObjectId() as unknown as ObjectId,
        title: 'Task 1',
        description: 'Desc 1',
        status: 'To Do',
        boardId: new mongo.ObjectId() as unknown as ObjectId
      },
      {
        _id: new mongo.ObjectId() as unknown as ObjectId,
        title: 'Task 2',
        description: 'Desc 2',
        status: 'In Progress',
        boardId: new mongo.ObjectId() as unknown as ObjectId
      },
      {
        _id: new mongo.ObjectId() as unknown as ObjectId,
        title: 'Task 3',
        description: 'Desc 3',
        status: 'To Do',
        boardId: new mongo.ObjectId() as unknown as ObjectId
      },
      {
        _id: new mongo.ObjectId() as unknown as ObjectId,
        title: 'Task 4',
        description: 'Desc 4',
        status: 'Done',
        boardId: new mongo.ObjectId() as unknown as ObjectId
      },
      {
        _id: new mongo.ObjectId() as unknown as ObjectId,
        title: 'Task 5',
        description: 'Desc 5',
        status: 'In Progress',
        boardId: new mongo.ObjectId() as unknown as ObjectId
      }
    ] as TaskDocument[];

    repository.findAll.mockResolvedValue(mockTasks);

    const result = await service.findAll({});

    expect(result).toEqual({
      tasks: mockTasks,
      summary: {
        statusCount: {
          'To Do': 2,
          'In Progress': 2,
          Done: 1
        }
      }
    });
  });

  it('should return null if no tasks found', async () => {
    repository.findAll.mockResolvedValue(null);

    const result = await service.findAll({});

    expect(result).toBeNull();
  });
});
