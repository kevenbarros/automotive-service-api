import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import brandModel from '../models/brandModel';

export const createBrand = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const brand = new brandModel({ name });
    const savedBrand = await brand.save();

    res.status(201).json(savedBrand);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getBrands = async (req: Request, res: Response) => {
  try {
    const brands = await brandModel.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar marcas.' });
  }
};

export const getBrandById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID inválido.' });
    }

    const brand = await brandModel.findById(id);
    if (!brand) {
      return res.status(404).json({ message: 'Marca não encontrada.' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar a marca.' });
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID inválido.' });
    }

    const brand = await brandModel.findById(id);
    if (!brand) {
      return res.status(404).json({ message: 'Marca não encontrada.' });
    }

    brand.name = name;
    const updatedBrand = await brand.save();

    res.status(200).json(updatedBrand);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID inválido.' });
    }

    const brand = await brandModel.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ message: 'Marca não encontrada.' });
    }

    res.status(200).json({ message: 'Marca deletada com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar a marca.' });
  }
};
