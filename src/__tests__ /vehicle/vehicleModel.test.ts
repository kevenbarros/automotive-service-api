import mongoose from 'mongoose';
import vehicleModel from '../../models/vehicleModel';
import modelModel from '../../models/modelModel';
import brandModel from '../../models/brandModel';
import clientModel from '../../models/clientModel';

describe('Vehicle Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb+srv://kevenbarros:keenbs07@cluster0.cb6fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create and save a vehicle successfully', async () => {
    const model = new modelModel({ name: 'Test Model', brandId: new mongoose.Types.ObjectId() });
    await model.save();
    
    const brand = new brandModel({ name: 'Test Brand' });
    await brand.save();
    
    const client = new clientModel({ name: 'Test Client', email: 'test@example.com', phone: '123456789' });
    await client.save();
    
    const vehicle = new vehicleModel({
      modelId: model._id,
      brandId: brand._id,
      year: 2020,
      clientId: client._id,
    });

    const savedVehicle = await vehicle.save();
    expect(savedVehicle._id).toBeDefined();
    expect(savedVehicle.year).toBe(2020);

    await vehicleModel.findByIdAndDelete(savedVehicle._id);
    await modelModel.findByIdAndDelete(model._id);
    await brandModel.findByIdAndDelete(brand._id);
    await clientModel.findByIdAndDelete(client._id);
  });
});
