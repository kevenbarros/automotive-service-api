import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';
import brandModel from '../../models/brandModel';

describe('Brand Controller Test', () => {
  const route = '/api/brands/';

  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://kevenbarros:keenbs07@cluster0.cb6fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('POST /brands - should create a new brand', async () => {
    const random = Math.floor(Math.random() * 10000);
    const newBrand = {
      name: 'Brand' + random,
    };

    const response = await request(app)
      .post(route)
      .send(newBrand);

    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.name).toBe(newBrand.name);

    await brandModel.findByIdAndDelete(response.body._id);
  });

  it('GET /brands - should return all brands', async () => {
    const response = await request(app).get(route);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('GET /brands/:id - should return a single brand by ID', async () => {
    const brand = new brandModel({
      name: 'Sample Brand',
    });
    await brand.save();

    const response = await request(app).get(`${route}${brand._id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(brand.name);

    await brandModel.findByIdAndDelete(brand._id); 
  });

  it('PUT /brands/:id - should update a brand by ID', async () => {
    const brand = new brandModel({
      name: 'Initial Brand',
    });
    await brand.save();

    const updatedData = { name: 'Updated Brand' };
    const response = await request(app)
      .put(`${route}${brand._id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedData.name);

    await brandModel.findByIdAndDelete(brand._id); 
  });

  it('DELETE /brands/:id - should delete a brand by ID', async () => {
    const brand = new brandModel({
      name: 'Brand to Delete',
    });
    await brand.save();

    const response = await request(app).delete(`${route}${brand._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Marca deletada com sucesso.');

    const deletedBrand = await brandModel.findById(brand._id);
    expect(deletedBrand).toBeNull(); 
  });
});
