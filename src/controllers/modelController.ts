import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import brandModel from '../models/brandModel';
import modelModel from '../models/modelModel';
import { checkIfExists } from '../utils/checkIfExists';

export const createModel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, brandId } = req.body;

    if (!isValidObjectId(brandId)) {
      return res.status(400).json({ message: 'ID de Marca inválido.' });
    }
    await checkIfExists(brandId, brandModel, 'marca', next);

    const model = new modelModel({ name, brandId });
    const savedModel = await model.save();

    res.status(201).json(savedModel);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getModels = async (req: Request, res: Response) => {
  try {
    const models = await modelModel.find().populate('brandId');
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar modelos.' });
  }
};

export const getModelById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID inválido.' });
    }

    const model = await modelModel.findById(id).populate('brandId');
    if (!model) {
      return res.status(404).json({ message: 'Modelo não encontrado.' });
    }

    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o modelo.' });
  }
};

export const updateModel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, brandId } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID inválido.' });
    }

    await checkIfExists(brandId, brandModel, 'marca', next);

    const model = await modelModel.findById(id);
    if (!model) {
      return res.status(404).json({ message: 'Modelo não encontrado.' });
    }

    model.name = name;
    model.brandId = brandId;
    const updatedModel = await model.save();

    res.status(200).json(updatedModel);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteModel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID inválido.' });
    }

    const model = await modelModel.findByIdAndDelete(id);
    if (!model) {
      return res.status(404).json({ message: 'Modelo não encontrado.' });
    }

    res.status(200).json({ message: 'Modelo deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o modelo.' });
  }
};
