import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './resources/tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-test'),
    TasksModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
