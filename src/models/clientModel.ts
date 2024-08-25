import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  name: string;
  email: string;
  phone: string;
}

const clientSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
});

export default mongoose.model<IClient>('Client', clientSchema);
