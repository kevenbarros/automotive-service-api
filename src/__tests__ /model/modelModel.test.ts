import mongoose from 'mongoose';
import modelModel from '../../models/modelModel';
import brandModel, { IBrand } from '../../models/brandModel';

describe('Model Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://kevenbarros:keenbs07@cluster0.cb6fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('create & save model successfully', async () => {
    const random = Math.floor(Math.random() * 10000);

    const brand = new brandModel({
      name: 'Brand' + random,
    });
    const savedBrand: IBrand = await brand.save();

    const validModel = new modelModel({
      name: 'Model' + random,
      brandId: savedBrand._id,
    });

    const savedModel = await validModel.save();

    expect(savedModel._id).toBeDefined();
    expect(savedModel.name).toBe(validModel.name);
    expect(savedModel.brandId.toString()).toBe((savedBrand._id as string).toString());

    await modelModel.findByIdAndDelete(savedModel._id);
    await brandModel.findByIdAndDelete(savedBrand._id);
  });

  it('create model without required field should fail', async () => {
    const modelWithoutRequiredField = new modelModel({ name: 'Model without Brand' });
    let err;
    try {
      await modelWithoutRequiredField.save();
    } catch (error) {
      err = error as mongoose.Error.ValidationError;
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors?.brandId).toBeDefined();
    }
  });
});
