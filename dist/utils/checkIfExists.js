"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfExists = void 0;
const errorHandler_1 = require("./errorHandler");
const isValidId_1 = require("./isValidId");
const checkIfExists = (id, model, modelName, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, isValidId_1.isValidId)(id)) {
        next(new errorHandler_1.AppError(`${modelName} ID inválido.`, 400));
    }
    const document = yield model.findById(id);
    if (!document) {
        next(new errorHandler_1.AppError(`${modelName} não encontrado.`, 400));
    }
    return document;
});
exports.checkIfExists = checkIfExists;
