import { Model, FlattenMaps } from 'mongoose';
import { UserDocument } from '../users/user.entity';
import { InjectModel } from '@nestjs/mongoose';

export class AuthRepository {
  constructor(
    @InjectModel('User')
    private readonly model: Model<UserDocument>
  ) {}

  async save(entity: Partial<UserDocument>): Promise<UserDocument> {
    return this.model.create(entity);
  }

  async findOneBy(query: any): Promise<FlattenMaps<UserDocument> | null> {
    return this.model.findOne(query).lean().exec();
  }
}
