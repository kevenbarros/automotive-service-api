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
exports.deleteVehicle = exports.updateVehicle = exports.getVehicleById = exports.getVehicles = exports.createVehicle = void 0;
const isValidId_1 = require("../utils/isValidId");
const errorHandler_1 = require("../utils/errorHandler");
const clientModel_1 = __importDefault(require("../models/clientModel"));
const mongoose_1 = require("mongoose");
const brandModel_1 = __importDefault(require("../models/brandModel"));
const modelModel_1 = __importDefault(require("../models/modelModel"));
const checkIfExists_1 = require("../utils/checkIfExists");
const vehicleModel_1 = __importDefault(require("../models/vehicleModel"));
const createVehicle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId, modelId, brandId, year } = req.body;
        yield (0, checkIfExists_1.checkIfExists)(clientId, clientModel_1.default, 'Cliente', next);
        yield (0, checkIfExists_1.checkIfExists)(modelId, modelModel_1.default, 'Modelo', next);
        const vehicle = new vehicleModel_1.default({
            clientId,
            modelId,
            brandId,
            year,
        });
        const savedVehicle = yield vehicle.save();
        res.status(201).json(savedVehicle);
    }
    catch (error) {
        next(new errorHandler_1.AppError('Falha ao criar veículo', 400));
    }
});
exports.createVehicle = createVehicle;
const getVehicles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicles = yield vehicleModel_1.default.find().populate('clientId modelId');
        res.status(200).json(vehicles);
    }
    catch (error) {
        next(new errorHandler_1.AppError('Falha ao criar veículo', 500));
    }
});
exports.getVehicles = getVehicles;
const getVehicleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, isValidId_1.isValidId)(id)) {
        res.status(400).json({ message: 'ID de Veículo inválido.' });
        return;
    }
    try {
        const vehicle = yield vehicleModel_1.default.findById(id).populate('clientId modelId');
        if (!vehicle) {
            next(new errorHandler_1.AppError('Veículo não encontrado.', 404));
            return;
        }
        res.status(200).json(vehicle);
    }
    catch (error) {
        next(new errorHandler_1.AppError('Falha buscar veículos pelo ID', 500));
    }
});
exports.getVehicleById = getVehicleById;
const updateVehicle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, isValidId_1.isValidId)(id)) {
        next(new errorHandler_1.AppError('ID de Veículo inválido.', 400));
        return;
    }
    try {
        const { id } = req.params;
        const { clientId, modelId, brandId, year } = req.body;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            next(new errorHandler_1.AppError('Id invalido', 404));
            return;
        }
        const vehicle = yield vehicleModel_1.default.findById(id);
        if (!vehicle) {
            next(new errorHandler_1.AppError('veiculo nao encontrado', 404));
            return;
        }
        yield (0, checkIfExists_1.checkIfExists)(clientId, clientModel_1.default, 'Cliente', next);
        yield (0, checkIfExists_1.checkIfExists)(brandId, brandModel_1.default, 'Marca', next);
        yield (0, checkIfExists_1.checkIfExists)(modelId, modelModel_1.default, 'Modelo', next);
        vehicle.clientId = clientId;
        vehicle.modelId = modelId;
        vehicle.year = year;
        const updatedVehicle = yield vehicle.save();
        res.status(200).json(updatedVehicle);
    }
    catch (error) {
        next(new errorHandler_1.AppError('Falha ao atualizar veículo', 400));
    }
});
exports.updateVehicle = updateVehicle;
const deleteVehicle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, isValidId_1.isValidId)(id)) {
        res.status(400).json({ message: 'ID de Veículo inválido.' });
        return;
    }
    try {
        const vehicle = yield vehicleModel_1.default.findByIdAndDelete(id);
        if (!vehicle) {
            next(new errorHandler_1.AppError('Veículo não encontrado', 404));
            return;
        }
        res.status(204).json({ message: 'Veículo excluído com sucesso.' });
    }
    catch (error) {
        next(new errorHandler_1.AppError('Falha ao deletar veículo', 500));
    }
});
exports.deleteVehicle = deleteVehicle;
