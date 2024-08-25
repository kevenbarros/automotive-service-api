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
exports.deleteService = exports.getServices = exports.getServiceById = exports.updateService = exports.createService = void 0;
const serviceModel_1 = __importDefault(require("../models/serviceModel"));
const clientModel_1 = __importDefault(require("../models/clientModel"));
const vehicleModel_1 = __importDefault(require("../models/vehicleModel"));
const isValidId_1 = require("../utils/isValidId");
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientId, vehicleId, description, serviceDate, status, serviceValue } = req.body;
    try {
        if (!(0, isValidId_1.isValidId)(clientId) || !(yield clientModel_1.default.findById(clientId))) {
            res.status(400).json({ message: 'ID de Cliente inválido ou não encontrado.' });
            return;
        }
        if (!(0, isValidId_1.isValidId)(vehicleId) || !(yield vehicleModel_1.default.findById(vehicleId))) {
            res.status(400).json({ message: 'ID de Veículo inválido ou não encontrado.' });
            return;
        }
        const service = new serviceModel_1.default({
            description,
            serviceDate,
            vehicleId,
            clientId,
            status: status,
            serviceValue
        });
        yield service.save();
        res.status(201).json(service);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createService = createService;
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const service = yield serviceModel_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!service) {
            res.status(404).json({ message: 'Serviço não encontrado' });
            return;
        }
        res.json(service);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateService = updateService;
const getServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield serviceModel_1.default.findById(req.params.id);
        if (!service) {
            res.status(404).json({ message: 'Serviço não encontrado' });
            return;
        }
        res.json(service);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getServiceById = getServiceById;
const getServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { vehicleId, clientId, status } = req.query;
        const query = {};
        if (vehicleId)
            query.vehicleId = vehicleId;
        if (clientId)
            query.clientId = clientId;
        if (status)
            query.status = status;
        const services = yield serviceModel_1.default.find(query);
        res.json(services);
    }
    catch (error) {
        res.status(400).json({ message: error !== null && error !== void 0 ? error : "error" });
    }
});
exports.getServices = getServices;
const deleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const service = yield serviceModel_1.default.findByIdAndDelete(id);
        if (!service) {
            res.status(404).json({ message: 'Serviço não encontrado' });
            return;
        }
        res.json({ message: 'Serviço excluído com sucesso' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.deleteService = deleteService;
