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
exports.deleteBrand = exports.updateBrand = exports.getBrandById = exports.getBrands = exports.createBrand = void 0;
const mongoose_1 = require("mongoose");
const brandModel_1 = __importDefault(require("../models/brandModel"));
const createBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const brand = new brandModel_1.default({ name });
        const savedBrand = yield brand.save();
        res.status(201).json(savedBrand);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createBrand = createBrand;
const getBrands = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brands = yield brandModel_1.default.find();
        res.status(200).json(brands);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar marcas.' });
    }
});
exports.getBrands = getBrands;
const getBrandById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: 'ID inválido.' });
        }
        const brand = yield brandModel_1.default.findById(id);
        if (!brand) {
            return res.status(404).json({ message: 'Marca não encontrada.' });
        }
        res.status(200).json(brand);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar a marca.' });
    }
});
exports.getBrandById = getBrandById;
const updateBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: 'ID inválido.' });
        }
        const brand = yield brandModel_1.default.findById(id);
        if (!brand) {
            return res.status(404).json({ message: 'Marca não encontrada.' });
        }
        brand.name = name;
        const updatedBrand = yield brand.save();
        res.status(200).json(updatedBrand);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateBrand = updateBrand;
const deleteBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: 'ID inválido.' });
        }
        const brand = yield brandModel_1.default.findByIdAndDelete(id);
        if (!brand) {
            return res.status(404).json({ message: 'Marca não encontrada.' });
        }
        res.status(200).json({ message: 'Marca deletada com sucesso.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao deletar a marca.' });
    }
});
exports.deleteBrand = deleteBrand;
