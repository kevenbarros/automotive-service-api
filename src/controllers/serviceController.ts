import { Request, Response } from 'express';
import Service, { EServiceStatus, IService } from '../models/serviceModel';
import clientModel from '../models/clientModel';
import vehicleModel from '../models/vehicleModel';
import { isValidId } from '../utils/isValidId';

export const createService = async (req: Request, res: Response): Promise<void> => {
    const { clientId, vehicleId, description, serviceDate, status, serviceValue } = req.body;
    try {
        
        if (!isValidId(clientId) || !(await clientModel.findById(clientId))) {
            res.status(400).json({ message: 'ID de Cliente inválido ou não encontrado.' });
            return
        }
    
        if (!isValidId(vehicleId) || !(await vehicleModel.findById(vehicleId))) {
            res.status(400).json({ message: 'ID de Veículo inválido ou não encontrado.' });
            return
        }
    
        const service: IService = new Service({
          description,
          serviceDate,
          vehicleId,
          clientId,
          status: status as EServiceStatus,
          serviceValue
        });
    
        await service.save();
        res.status(201).json(service);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateService = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const service = await Service.findByIdAndUpdate(id, req.body, { new: true });
        if (!service) {
            res.status(404).json({ message: 'Serviço não encontrado' });
            return;
        }
        res.json(service);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getServiceById = async (req: Request, res: Response): Promise<void> => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            res.status(404).json({ message: 'Serviço não encontrado' });
            return;
        }
        res.json(service);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getServices = async (req: Request, res: Response): Promise<void> => {
    try {
        const { vehicleId, clientId, status } = req.query;
        const query: any = {};

        if (vehicleId) query.vehicleId = vehicleId;

        if (clientId) query.clientId = clientId;

        if (status) query.status = status;

        const services = await Service.find(query);
        res.json(services);
    } catch (error: any) {
        res.status(400).json({ message: error ?? "error" });
    }
};

export const deleteService = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const service = await Service.findByIdAndDelete(id);
        if (!service) {
            res.status(404).json({ message: 'Serviço não encontrado' });
            return;
        }
        res.json({ message: 'Serviço excluído com sucesso' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
