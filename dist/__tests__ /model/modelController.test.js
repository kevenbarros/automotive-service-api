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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../../app"));
const modelModel_1 = __importDefault(require("../../models/modelModel"));
const brandModel_1 = __importDefault(require("../../models/brandModel"));
describe('Model Controller Test', () => {
    const route = '/api/models/';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect('mongodb+srv://kevenbarros:keenbs07@cluster0.cb6fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    it('POST /models - should create a new model', () => __awaiter(void 0, void 0, void 0, function* () {
        const random = Math.floor(Math.random() * 10000);
        const brand = new brandModel_1.default({ name: 'Brand' + random });
        const savedBrand = yield brand.save();
        const newModel = {
            name: 'Model' + random,
            brandId: savedBrand._id,
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(route)
            .send(newModel);
        expect(response.status).toBe(201);
        expect(response.body._id).toBeDefined();
        expect(response.body.name).toBe(newModel.name);
        yield modelModel_1.default.findByIdAndDelete(response.body._id);
        yield brandModel_1.default.findByIdAndDelete(savedBrand._id);
    }));
    it('GET /models - should return all models', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(route);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    }));
    it('GET /models/:id - should return a single model by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const brand = new brandModel_1.default({ name: 'Sample Brand' });
        yield brand.save();
        const model = new modelModel_1.default({
            name: 'Sample Model',
            brandId: brand._id,
        });
        yield model.save();
        const response = yield (0, supertest_1.default)(app_1.default).get(`${route}${model._id}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(model.name);
        yield modelModel_1.default.findByIdAndDelete(model._id);
        yield brandModel_1.default.findByIdAndDelete(brand._id);
    }));
    it('PUT /models/:id - should update a model by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const brand = new brandModel_1.default({ name: 'Initial Brand' });
        yield brand.save();
        const model = new modelModel_1.default({
            name: 'Initial Model',
            brandId: brand._id,
        });
        yield model.save();
        const updatedData = { name: 'Updated Model', brandId: brand._id };
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`${route}${model._id}`)
            .send(updatedData);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedData.name);
        yield modelModel_1.default.findByIdAndDelete(model._id);
        yield brandModel_1.default.findByIdAndDelete(brand._id);
    }));
    it('DELETE /models/:id - should delete a model by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const brand = new brandModel_1.default({ name: 'Brand to Delete' });
        yield brand.save();
        const model = new modelModel_1.default({
            name: 'Model to Delete',
            brandId: brand._id,
        });
        yield model.save();
        const response = yield (0, supertest_1.default)(app_1.default).delete(`${route}${model._id}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Modelo deletado com sucesso.');
        yield brandModel_1.default.findByIdAndDelete(brand._id);
    }));
});
