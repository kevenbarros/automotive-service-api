import { Schema, model, Document } from 'mongoose';

export interface IVehicle extends Document {
  modelId: Schema.Types.ObjectId;
  year: number;
  clientId: Schema.Types.ObjectId;
}

const VehicleSchema = new Schema<IVehicle>({
  modelId: {
    type: Schema.Types.ObjectId,
    ref: 'Model',
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
});

export default model<IVehicle>('Vehicle', VehicleSchema);
