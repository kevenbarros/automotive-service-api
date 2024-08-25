import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';
import serviceModel from '../../models/serviceModel';
import vehicleModel from '../../models/vehicleModel';
import modelModel from '../../models/modelModel';
import brandModel from '../../models/brandModel';
import clientModel from '../../models/clientModel';

describe('Service Controller Test', () => {
  const route = '/api/services/';

  beforeAll(async () => {
    await mongoose.connect("mongodb+srv://kevenbarros:keenbs07@cluster0.cb6fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('POST /services - should create a new service', async () => {
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
    await vehicle.save();

    const newService = {
      description: 'Test Service',
      serviceDate: new Date(),
      vehicleId: vehicle._id,
      clientId: client._id,
      status: 'Pendente',
      serviceValue: 100.0,
    };

    const response = await request(app)
      .post(route)
      .send(newService);

    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.description).toBe('Test Service');

    await serviceModel.findByIdAndDelete(response.body._id);
    await vehicleModel.findByIdAndDelete(vehicle._id);
    await modelModel.findByIdAndDelete(model._id);
    await brandModel.findByIdAndDelete(brand._id);
    await clientModel.findByIdAndDelete(client._id);
  });

  it('GET /services - should return all services', async () => {
    const response = await request(app).get(route);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('GET /services/:id - should return a single service by ID', async () => {
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
    await vehicle.save();

    const service = new serviceModel({
      description: 'Test Service',
      serviceDate: new Date(),
      vehicleId: vehicle._id,
      clientId: client._id,
      status: 'Pendente',
      serviceValue: 100.0,
    });
    await service.save();

    const response = await request(app).get(`${route}${service._id}`);
    expect(response.status).toBe(200);
    expect(response.body.description).toBe('Test Service');

    await serviceModel.findByIdAndDelete(service._id);
    await vehicleModel.findByIdAndDelete(vehicle._id);
    await modelModel.findByIdAndDelete(model._id);
    await brandModel.findByIdAndDelete(brand._id);
    await clientModel.findByIdAndDelete(client._id);
  });

  it('PUT /services/:id - should update a service by ID', async () => {
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
    await vehicle.save();

    const service = new serviceModel({
      description: 'Test Service',
      serviceDate: new Date(),
      vehicleId: vehicle._id,
      clientId: client._id,
      status: 'Pendente',
      serviceValue: 100.0,
    });
    await service.save();

    const updatedData = {
      description: 'Updated Test Service',
      serviceDate: new Date(),
      vehicleId: vehicle._id,
      clientId: client._id,
      status: 'Concluído',
      serviceValue: 150.0,
    };

    const response = await request(app)
      .put(`${route}${service._id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.description).toBe('Updated Test Service');
    expect(response.body.status).toBe('Concluído');
    expect(response.body.serviceValue).toBe(150.0);

    await serviceModel.findByIdAndDelete(service._id);
    await vehicleModel.findByIdAndDelete(vehicle._id);
    await modelModel.findByIdAndDelete(model._id);
    await brandModel.findByIdAndDelete(brand._id);
    await clientModel.findByIdAndDelete(client._id);
  });

  it('DELETE /services/:id - should delete a service by ID', async () => {
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
    await vehicle.save();

    const service = new serviceModel({
      description: 'Test Service',
      serviceDate: new Date(),
      vehicleId: vehicle._id,
      clientId: client._id,
      status: 'Pendente',
      serviceValue: 100.0,
    });
    await service.save();

    const response = await request(app).delete(`${route}${service._id}`);
    expect(response.status).toBe(200);

    await vehicleModel.findByIdAndDelete(vehicle._id);
    await modelModel.findByIdAndDelete(model._id);
    await brandModel.findByIdAndDelete(brand._id);
    await clientModel.findByIdAndDelete(client._id);
  });
});
