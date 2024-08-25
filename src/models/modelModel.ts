import { Schema, model, Document } from 'mongoose';

interface IModel extends Document {
  name: string;
  brandId: Schema.Types.ObjectId;
}

const ModelSchema = new Schema<IModel>({
  name: {
    type: String,
    required: true,
  },
  brandId: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    required: true,
  },
});

export default model<IModel>('Model', ModelSchema);
