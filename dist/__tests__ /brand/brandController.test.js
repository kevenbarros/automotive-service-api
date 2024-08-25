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
const brandModel_1 = __importDefault(require("../../models/brandModel"));
describe('Brand Controller Test', () => {
    const route = '/api/brands/';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect('mongodb+srv://kevenbarros:keenbs07@cluster0.cb6fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    it('POST /brands - should create a new brand', () => __awaiter(void 0, void 0, void 0, function* () {
        const random = Math.floor(Math.random() * 10000);
        const newBrand = {
            name: 'Brand' + random,
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(route)
            .send(newBrand);
        expect(response.status).toBe(201);
        expect(response.body._id).toBeDefined();
        expect(response.body.name).toBe(newBrand.name);
        yield brandModel_1.default.findByIdAndDelete(response.body._id);
    }));
    it('GET /brands - should return all brands', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(route);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    }));
    it('GET /brands/:id - should return a single brand by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const brand = new brandModel_1.default({
            name: 'Sample Brand',
        });
        yield brand.save();
        const response = yield (0, supertest_1.default)(app_1.default).get(`${route}${brand._id}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(brand.name);
        yield brandModel_1.default.findByIdAndDelete(brand._id);
    }));
    it('PUT /brands/:id - should update a brand by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const brand = new brandModel_1.default({
            name: 'Initial Brand',
        });
        yield brand.save();
        const updatedData = { name: 'Updated Brand' };
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`${route}${brand._id}`)
            .send(updatedData);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedData.name);
        yield brandModel_1.default.findByIdAndDelete(brand._id);
    }));
    it('DELETE /brands/:id - should delete a brand by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const brand = new brandModel_1.default({
            name: 'Brand to Delete',
        });
        yield brand.save();
        const response = yield (0, supertest_1.default)(app_1.default).delete(`${route}${brand._id}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Marca deletada com sucesso.');
        const deletedBrand = yield brandModel_1.default.findById(brand._id);
        expect(deletedBrand).toBeNull();
    }));
});
