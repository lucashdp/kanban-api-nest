import { Schema, Document, model } from 'mongoose';

interface User {
  name: string;
  email: string;
  password: string;
}

interface UserDocument extends User, Document {}

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true, maxlength: 150 },
  email: { type: String, required: true, unique: true },
  password: { type: String }
});

const UserModel = model<UserDocument>('User', UserSchema);

export { User, UserModel, UserDocument, UserSchema };
