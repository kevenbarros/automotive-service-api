import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  description: string;
  serviceDate: Date;
  vehicleId: mongoose.Schema.Types.ObjectId;
  clientId: mongoose.Schema.Types.ObjectId;
  status: EServiceStatus;
  serviceValue: number;
}

export enum EServiceStatus {
  Pendente = 'Pendente',
  EmAndamento = 'Em Andamento',
  Concluido = 'Concluído'
}

const serviceSchema: Schema = new Schema({
  description: { type: String, required: true },
  serviceDate: { type: Date, required: true },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  status: { type: String, enum: Object.values(EServiceStatus) , required: true },
  serviceValue: { type: Number, required: true },
});

export default mongoose.model<IService>('Service', serviceSchema);
