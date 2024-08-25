import request from 'supertest';
import mongoose from 'mongoose';
import clientModel from '../../models/clientModel';
import app from '../../app';

let clientId: mongoose.Types.ObjectId;

beforeAll(async () => {
  await mongoose.connect('mongodb+srv://kevenbarros:keenbs07@cluster0.cb6fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  const randon = Math.floor(Math.random() * 10000);
  const newClient = new clientModel({
    name: 'Jane Doe' + randon,
    email: `${randon}teste@example.com`,
    phone: randon.toString(),
  });
  const savedClient = await newClient.save();
  clientId = savedClient._id as mongoose.Types.ObjectId;
});

afterEach(async () => {
  await clientModel.findByIdAndDelete(clientId);
});

describe('Client Controller', () => {
  const route = '/api/clients/';

  it('POST /clients - should create a new client', async () => {
    const randon = Math.floor(Math.random() * 10000);
    const newClient = {
      name: 'John Doe' + randon,
      email: `${randon}johndoe@example.com`,
      phone: randon.toString(),
    };

    const response = await request(app)
      .post(route)
      .send(newClient);

    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.name).toBe(newClient.name);

    await clientModel.findByIdAndDelete(response.body._id);
  });

  it('GET /clients - should return all clients', async () => {
    const response = await request(app).get(route);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('GET /clients/:id - should return a single client by ID', async () => {
    const response = await request(app).get(`${route}${clientId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBeDefined();
  });

  it('PUT /clients/:id - should update a client by ID', async () => {
    const updatedData = { name: 'Markus Doe' };
    const response = await request(app)
      .put(`${route}${clientId}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedData.name);
  });

  it('DELETE /clients/:id - should delete a client by ID', async () => {
    const response = await request(app).delete(`${route}${clientId}`);
    expect(response.status).toBe(204);
  });
});
