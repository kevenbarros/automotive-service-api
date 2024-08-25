import { NextFunction, Request, Response } from 'express';
import { isValidId } from '../utils/isValidId';
import { AppError } from '../utils/errorHandler';
import clientModel from '../models/clientModel';
import { isValidObjectId } from 'mongoose';
import brandModel from '../models/brandModel';
import modelModel from '../models/modelModel';
import { checkIfExists } from '../utils/checkIfExists';
import vehicleModel from '../models/vehicleModel';

export const createVehicle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    const { clientId, modelId, brandId, year } = req.body;
    
    await checkIfExists(clientId, clientModel, 'Cliente', next);
     await checkIfExists(modelId, modelModel, 'Modelo', next);
 
    const vehicle = new vehicleModel({
        clientId,
        modelId,
        brandId,
        year,
      });

      const savedVehicle = await vehicle.save();
      res.status(201).json(savedVehicle);
    } catch (error) {
        next(new AppError('Falha ao criar veículo', 400));
    }
};

export const getVehicles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const vehicles = await vehicleModel.find().populate('clientId modelId');
        res.status(200).json(vehicles);
    } catch (error) {
        next(new AppError('Falha ao criar veículo', 500));
    }
};

export const getVehicleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    if (!isValidId(id)) {
        res.status(400).json({ message: 'ID de Veículo inválido.' });
        return
    }

    try {
        const vehicle = await vehicleModel.findById(id).populate('clientId modelId');
        if (!vehicle) {
            next(new AppError('Veículo não encontrado.', 404));
            return
        }
        res.status(200).json(vehicle);
    } catch (error) {
        next(new AppError('Falha buscar veículos pelo ID', 500));
    }
};

export const updateVehicle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    if (!isValidId(id)) {
        next(new AppError('ID de Veículo inválido.', 400));
        return
    }

    try {
    
        const { id } = req.params;
        const { clientId, modelId, brandId, year } = req.body;
    
        if (!isValidObjectId(id)) {
            next(new AppError('Id invalido', 404));
             return 
        }
        const vehicle = await vehicleModel.findById(id);
        if (!vehicle) {
            next(new AppError('veiculo nao encontrado', 404));
          return 
        }
        await checkIfExists(clientId, clientModel, 'Cliente', next);
        await checkIfExists(brandId, brandModel, 'Marca', next);
        await checkIfExists(modelId, modelModel, 'Modelo', next);
    
        vehicle.clientId = clientId;
        vehicle.modelId = modelId;
        vehicle.year = year;
    
        const updatedVehicle = await vehicle.save();
        res.status(200).json(updatedVehicle);
    } catch (error) {
        next(new AppError('Falha ao atualizar veículo', 400));
    }
};

export const deleteVehicle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    if (!isValidId(id)) {
        res.status(400).json({ message: 'ID de Veículo inválido.' });
        return
    }
    try {
        const vehicle = await vehicleModel.findByIdAndDelete(id);
        if (!vehicle) {
            next(new AppError('Veículo não encontrado', 404));
            return
        }
        res.status(204).json({ message: 'Veículo excluído com sucesso.' });
    } catch (error) {
        next(new AppError('Falha ao deletar veículo', 500));

    }
};
