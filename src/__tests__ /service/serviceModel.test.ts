import mongoose from 'mongoose';
import serviceModel, { IService, EServiceStatus } from '../../models/serviceModel';
import vehicleModel, { IVehicle } from '../../models/vehicleModel';
import clientModel, { IClient } from '../../models/clientModel';

describe('Service Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://kevenbarros:keenbs07@cluster0.cb6fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('create & save service successfully', async () => {
    const random = Math.floor(Math.random() * 10000);

    // Criando um cliente de teste
    const client = new clientModel({
      name: 'Client ' + random,
      email: `client${random}@example.com`,
      phone: '123456789',
    });
    const savedClient: IClient = await client.save();

    // Criando um veículo de teste
    const vehicle = new vehicleModel({
      modelId: new mongoose.Types.ObjectId(),
      brandId: new mongoose.Types.ObjectId(),
      year: 2022,
      clientId: savedClient._id,
    });
    const savedVehicle: IVehicle = await vehicle.save();

    // Criando um serviço de teste
    const validService = new serviceModel({
      description: 'Service ' + random,
      serviceDate: new Date(),
      vehicleId: savedVehicle._id,
      clientId: savedClient._id,
      status: EServiceStatus.Pendente,
      serviceValue: 100.0,
    });

    const savedService: IService = await validService.save();

    expect(savedService._id).toBeDefined();
    expect(savedService.description).toBe(validService.description);
    expect(savedService.vehicleId.toString()).toBe((savedVehicle._id as string).toString());
    expect(savedService.clientId.toString()).toBe((savedClient._id as string).toString());
    expect(savedService.status).toBe(EServiceStatus.Pendente);
    expect(savedService.serviceValue).toBe(100.0);

    // Limpando os dados de teste
    await serviceModel.findByIdAndDelete(savedService._id);
    await vehicleModel.findByIdAndDelete(savedVehicle._id);
    await clientModel.findByIdAndDelete(savedClient._id);
  });

  it('create service without required field should fail', async () => {
    const serviceWithoutRequiredField = new serviceModel({
      description: 'Service without Vehicle',
      serviceDate: new Date(),
      clientId: new mongoose.Types.ObjectId(),
      status: EServiceStatus.Pendente,
      serviceValue: 100.0,
    });

    let err;
    try {
      await serviceWithoutRequiredField.save();
    } catch (error) {
      err = error as mongoose.Error.ValidationError;
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors?.vehicleId).toBeDefined();
    }
  });
});
