import { NextFunction, Request, Response } from 'express';
import Client, { IClient } from '../models/clientModel';
import { isValidId } from '../utils/isValidId';
import { AppError } from '../utils/errorHandler';

export const createClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    const client: IClient = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    console.log(error)
    next(new AppError('Erro ao criar o cliente', 400));
  }
};

export const getClients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    next(new AppError('Erro buscar clientes', 500)); 
  }
};

export const getClientById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  if (!isValidId(id)) {
    next(new AppError('ID de Cliente inválido.', 400));
    return
  }

  try {
    const client = await Client.findById(id);
    if (!client) {
        next(new AppError('Cliente não encontrado.', 404));
      return
    }
    res.status(200).json(client);
  } catch (error) {
    next(new AppError('Erro buscar clientes pelo ID', 500));
  }
};

export const updateClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
  
    if (!isValidId(id)) {
        next(new AppError('ID de Cliente inválido.', 400));
      return
    }
  
    try {
      const client = await Client.findByIdAndUpdate(id, req.body, { new: true });
      if (!client) {
          next(new AppError('Cliente não encontrado.', 404));
        return
      }
      res.status(200).json(client);
    } catch (error) {
        next(new AppError('Erro buscar clientes pelo ID', 400));
    }
  };
  
  export const deleteClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
  
    if (!isValidId(id)) {
        res.status(400).json({ message: 'ID de Cliente inválido.' });
      return 
    }
  
    try {
      const client = await Client.findByIdAndDelete(id);
      if (!client) {
          next(new AppError('Cliente não encontrado.', 404));
        return
      }
      res.status(204).json({ message: 'Cliente excluído com sucesso.' });
    } catch (error) {
        next(new AppError('Erro ao deletar cliente', 500));
    }
  };