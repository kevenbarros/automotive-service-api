import { Schema, model, Document } from 'mongoose';

export interface IBrand extends Document {
  name: string;
}

const BrandSchema = new Schema<IBrand>({
  name: {
    type: String,
    required: true,
  },
});

export default model<IBrand>('Brand', BrandSchema);
