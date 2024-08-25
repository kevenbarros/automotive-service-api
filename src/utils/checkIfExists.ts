import { isValidObjectId } from "mongoose";
import { AppError } from "./errorHandler";
import { NextFunction } from "express";
import { isValidId } from "./isValidId";

interface MongooseModel {
    findById(id: string): Promise<any>;
}
export const checkIfExists = async (id: string, model: MongooseModel, modelName: string, next: NextFunction)  => {
    if (!isValidId(id)) {
      next(new AppError(`${modelName} ID inválido.`, 400));
    }
    const document = await model.findById(id);
    if (!document) {
      next(new AppError(`${modelName} não encontrado.`, 400));
    }
    return document;
  };