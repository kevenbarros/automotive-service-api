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
exports.deleteModel = exports.updateModel = exports.getModelById = exports.getModels = exports.createModel = void 0;
const mongoose_1 = require("mongoose");
const brandModel_1 = __importDefault(require("../models/brandModel"));
const modelModel_1 = __importDefault(require("../models/modelModel"));
const checkIfExists_1 = require("../utils/checkIfExists");
const createModel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, brandId } = req.body;
        if (!(0, mongoose_1.isValidObjectId)(brandId)) {
            return res.status(400).json({ message: 'ID de Marca inválido.' });
        }
        yield (0, checkIfExists_1.checkIfExists)(brandId, brandModel_1.default, 'marca', next);
        const model = new modelModel_1.default({ name, brandId });
        const savedModel = yield model.save();
        res.status(201).json(savedModel);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createModel = createModel;
const getModels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const models = yield modelModel_1.default.find().populate('brandId');
        res.status(200).json(models);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar modelos.' });
    }
});
exports.getModels = getModels;
const getModelById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: 'ID inválido.' });
        }
        const model = yield modelModel_1.default.findById(id).populate('brandId');
        if (!model) {
            return res.status(404).json({ message: 'Modelo não encontrado.' });
        }
        res.status(200).json(model);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar o modelo.' });
    }
});
exports.getModelById = getModelById;
const updateModel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, brandId } = req.body;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: 'ID inválido.' });
        }
        yield (0, checkIfExists_1.checkIfExists)(brandId, brandModel_1.default, 'marca', next);
        const model = yield modelModel_1.default.findById(id);
        if (!model) {
            return res.status(404).json({ message: 'Modelo não encontrado.' });
        }
        model.name = name;
        model.brandId = brandId;
        const updatedModel = yield model.save();
        res.status(200).json(updatedModel);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateModel = updateModel;
const deleteModel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: 'ID inválido.' });
        }
        const model = yield modelModel_1.default.findByIdAndDelete(id);
        if (!model) {
            return res.status(404).json({ message: 'Modelo não encontrado.' });
        }
        res.status(200).json({ message: 'Modelo deletado com sucesso.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao deletar o modelo.' });
    }
});
exports.deleteModel = deleteModel;
