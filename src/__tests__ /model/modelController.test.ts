import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';
import modelModel from '../../models/modelModel';
import brandModel from '../../models/brandModel';

describe('Model Controller Test', () => {
  const route = '/api/models/';

  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://kevenbarros:keenbs07@cluster0.cb6fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('POST /models - should create a new model', async () => {
    const random = Math.floor(Math.random() * 10000);

    const brand = new brandModel({ name: 'Brand' + random });
    const savedBrand = await brand.save();

    const newModel = {
      name: 'Model' + random,
      brandId: savedBrand._id,
    };

    const response = await request(app)
      .post(route)
      .send(newModel);

    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.name).toBe(newModel.name);

    await modelModel.findByIdAndDelete(response.body._id);
    await brandModel.findByIdAndDelete(savedBrand._id);
  });

  it('GET /models - should return all models', async () => {
    const response = await request(app).get(route);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('GET /models/:id - should return a single model by ID', async () => {
    const brand = new brandModel({ name: 'Sample Brand' });
    await brand.save();

    const model = new modelModel({
      name: 'Sample Model',
      brandId: brand._id,
    });
    await model.save();

    const response = await request(app).get(`${route}${model._id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(model.name);

    await modelModel.findByIdAndDelete(model._id);
    await brandModel.findByIdAndDelete(brand._id);
  });

  it('PUT /models/:id - should update a model by ID', async () => {
    const brand = new brandModel({ name: 'Initial Brand' });
    await brand.save();

    const model = new modelModel({
      name: 'Initial Model',
      brandId: brand._id,
    });
    await model.save();

    const updatedData = { name: 'Updated Model', brandId: brand._id };
    const response = await request(app)
      .put(`${route}${model._id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedData.name);

    await modelModel.findByIdAndDelete(model._id);
    await brandModel.findByIdAndDelete(brand._id);
  });

  it('DELETE /models/:id - should delete a model by ID', async () => {
    const brand = new brandModel({ name: 'Brand to Delete' });
    await brand.save();

    const model = new modelModel({
      name: 'Model to Delete',
      brandId: brand._id,
    });
    await model.save();

    const response = await request(app).delete(`${route}${model._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Modelo deletado com sucesso.');

    await brandModel.findByIdAndDelete(brand._id);
  });
});
