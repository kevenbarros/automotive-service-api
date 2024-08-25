import mongoose from 'mongoose';
import clientModel from '../../models/clientModel';

describe('Client Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb+srv://kevenbarros:keenbs07@cluster0.cb6fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('create & save client successfully', async () => {
    const random = Math.floor(Math.random() * 10000);
    const validClient = new clientModel({
      name: 'Teste' + random,
      email: `${random}teste@example.com`,
      phone: random.toString(), 
    });
    const savedClient = await validClient.save();

    expect(savedClient._id).toBeDefined();
    expect(savedClient.name).toBe(validClient.name);
    expect(savedClient.email).toBe(validClient.email);
    expect(savedClient.phone).toBe(validClient.phone);

    await clientModel.findByIdAndDelete(savedClient._id);
  });

  it('create client without required field should fail', async () => {
    const clientWithoutRequiredField = new clientModel({ name: 'John Doe' });
    let err;
    try {
      await clientWithoutRequiredField.save();
    } catch (error) {
      err = error as mongoose.Error.ValidationError;

      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err?.errors?.email).toBeDefined();
    }
  });
});
