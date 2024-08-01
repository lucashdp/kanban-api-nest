import mongoose, { Document, ObjectId, Schema } from 'mongoose';

interface ITask extends Document {
  title: string;
  description: string;
  status: string;
  boardId: ObjectId;
}

interface TaskDocument extends ITask, Document {}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model<ITask>('Task', TaskSchema);
export { Task, TaskDocument, TaskSchema };
