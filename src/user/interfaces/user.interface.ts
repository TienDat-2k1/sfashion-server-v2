import { Document } from 'mongoose';

export interface IUserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordChangeAt?: Date;
  address?: string;
  phone?: string;
}
