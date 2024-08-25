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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.getClientById = exports.getClients = exports.createClient = void 0;
const clientModel_1 = __importDefault(require("../models/clientModel"));
const isValidId_1 = require("../utils/isValidId");
const errorHandler_1 = require("../utils/errorHandler");
const createClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = new clientModel_1.default(req.body);
        yield client.save();
        res.status(201).json(client);
    }
    catch (error) {
        console.log(error);
        next(new errorHandler_1.AppError('Erro ao criar o cliente', 400));
    }
});
exports.createClient = createClient;
const getClients = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield clientModel_1.default.find();
        res.status(200).json(clients);
    }
    catch (error) {
        next(new errorHandler_1.AppError('Erro buscar clientes', 500));
    }
});
exports.getClients = getClients;
const getClientById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, isValidId_1.isValidId)(id)) {
        next(new errorHandler_1.AppError('ID de Cliente inválido.', 400));
        return;
    }
    try {
        const client = yield clientModel_1.default.findById(id);
        if (!client) {
            next(new errorHandler_1.AppError('Cliente não encontrado.', 404));
            return;
        }
        res.status(200).json(client);
    }
    catch (error) {
        next(new errorHandler_1.AppError('Erro buscar clientes pelo ID', 500));
    }
});
exports.getClientById = getClientById;
const updateClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, isValidId_1.isValidId)(id)) {
        next(new errorHandler_1.AppError('ID de Cliente inválido.', 400));
        return;
    }
    try {
        const client = yield clientModel_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!client) {
            next(new errorHandler_1.AppError('Cliente não encontrado.', 404));
            return;
        }
        res.status(200).json(client);
    }
    catch (error) {
        next(new errorHandler_1.AppError('Erro buscar clientes pelo ID', 400));
    }
});
exports.updateClient = updateClient;
const deleteClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, isValidId_1.isValidId)(id)) {
        res.status(400).json({ message: 'ID de Cliente inválido.' });
        return;
    }
    try {
        const client = yield clientModel_1.default.findByIdAndDelete(id);
        if (!client) {
            next(new errorHandler_1.AppError('Cliente não encontrado.', 404));
            return;
        }
        res.status(204).json({ message: 'Cliente excluído com sucesso.' });
    }
    catch (error) {
        next(new errorHandler_1.AppError('Erro ao deletar cliente', 500));
    }
});
exports.deleteClient = deleteClient;
