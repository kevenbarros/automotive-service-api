import mongoose from 'mongoose';
import brandModel from '../../models/brandModel';

describe('Brand Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://kevenbarros:keenbs07@cluster0.cb6fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('create & save brand successfully', async () => {
    const random = Math.floor(Math.random() * 10000);
    const validBrand = new brandModel({
      name: 'Brand' + random,
    });
    const savedBrand = await validBrand.save();

    expect(savedBrand._id).toBeDefined();
    expect(savedBrand.name).toBe(validBrand.name);

    await brandModel.findByIdAndDelete(savedBrand._id);
  });

  it('create brand without required field should fail', async () => {
    const brandWithoutRequiredField = new brandModel({});
    let err;
    try {
      await brandWithoutRequiredField.save();
    } catch (error) {
      err = error as mongoose.Error.ValidationError;

      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err?.errors?.name).toBeDefined();
    }
  });
});
