import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';
import vehicleModel from '../../models/vehicleModel';
import modelModel from '../../models/modelModel';
import brandModel from '../../models/brandModel';
import clientModel from '../../models/clientModel';

describe('Vehicle Controller Test', () => {
  const route = '/api/vehicles/';

  beforeAll(async () => {
    await mongoose.connect("mongodb+srv://kevenbarros:keenbs07@cluster0.cb6fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('POST /vehicles - should create a new vehicle', async () => {
    const model = new modelModel({ name: 'Test Model', brandId: new mongoose.Types.ObjectId() });
    await model.save();

    const brand = new brandModel({ name: 'Test Brand' });
    await brand.save();

    const client = new clientModel({ name: 'Test Client', email: '1test@example.com', phone: '123456789' });
    await client.save();

    const newVehicle = {
      modelId: model._id,
      brandId: brand._id,
      year: 2020,
      clientId: client._id,
    };

    const response = await request(app)
      .post(route)
      .send(newVehicle);

    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.year).toBe(2020);

    await vehicleModel.findByIdAndDelete(response.body._id);
    await modelModel.findByIdAndDelete(model._id);
    await brandModel.findByIdAndDelete(brand._id);
    await clientModel.findByIdAndDelete(client._id);
  });

  it('GET /vehicles - should return all vehicles', async () => {
    const response = await request(app).get(route);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('GET /vehicles/:id - should return a single vehicle by ID', async () => {
    const model = new modelModel({ name: 'Test Model', brandId: new mongoose.Types.ObjectId() });
    await model.save();

    const brand = new brandModel({ name: 'Test Brand' });
    await brand.save();

    const client = new clientModel({ name: 'Test Client', email: '1test@example.com', phone: '123456789' });
    await client.save();

    const vehicle = new vehicleModel({
      modelId: model._id,
      brandId: brand._id,
      year: 2020,
      clientId: client._id,
    });
    await vehicle.save();

    const response = await request(app).get(`${route}${vehicle._id}`);
    expect(response.status).toBe(200);
    expect(response.body.year).toBe(2020);

    await vehicleModel.findByIdAndDelete(vehicle._id);
    await modelModel.findByIdAndDelete(model._id);
    await brandModel.findByIdAndDelete(brand._id);
    await clientModel.findByIdAndDelete(client._id);
  });

  it('PUT /vehicles/:id - should update a vehicle by ID', async () => {
    const model = new modelModel({ name: 'Test Model', brandId: new mongoose.Types.ObjectId() });
    await model.save();

    const brand = new brandModel({ name: 'Test Brand' });
    await brand.save();

    const client = new clientModel({ name: 'Test Client', email: '1test@example.com', phone: '123456789' });
    await client.save();

    const vehicle = new vehicleModel({
      modelId: model._id,
      brandId: brand._id,
      year: 2020,
      clientId: client._id,
    });
    await vehicle.save();

    const updatedData = {
      modelId: model._id,
      brandId: brand._id,
      year: 2021,
      clientId: client._id,
    };

    const response = await request(app)
      .put(`${route}${vehicle._id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.year).toBe(2021);

    await vehicleModel.findByIdAndDelete(vehicle._id);
    await modelModel.findByIdAndDelete(model._id);
    await brandModel.findByIdAndDelete(brand._id);
    await clientModel.findByIdAndDelete(client._id);
  });

  it('DELETE /vehicles/:id - should delete a vehicle by ID', async () => {
    const model = new modelModel({ name: 'Test Model', brandId: new mongoose.Types.ObjectId() });
    await model.save();

    const brand = new brandModel({ name: 'Test Brand' });
    await brand.save();

    const client = new clientModel({ name: 'Test Client', email: '1test@example.com', phone: '123456789' });
    await client.save();

    const vehicle = new vehicleModel({
      modelId: model._id,
      brandId: brand._id,
      year: 2020,
      clientId: client._id,
    });
    await vehicle.save();

    const response = await request(app).delete(`${route}${vehicle._id}`);
    expect(response.status).toBe(204);

    await modelModel.findByIdAndDelete(model._id);
    await brandModel.findByIdAndDelete(brand._id);
    await clientModel.findByIdAndDelete(client._id);
  });
});
