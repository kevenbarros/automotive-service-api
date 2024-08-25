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
const serviceModel_1 = __importDefault(require("../../models/serviceModel"));
const vehicleModel_1 = __importDefault(require("../../models/vehicleModel"));
const modelModel_1 = __importDefault(require("../../models/modelModel"));
const brandModel_1 = __importDefault(require("../../models/brandModel"));
const clientModel_1 = __importDefault(require("../../models/clientModel"));
describe('Service Controller Test', () => {
    const route = '/api/services/';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb+srv://kevenbarros:keenbs07@cluster0.cb6fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    it('POST /services - should create a new service', () => __awaiter(void 0, void 0, void 0, function* () {
        const model = new modelModel_1.default({ name: 'Test Model', brandId: new mongoose_1.default.Types.ObjectId() });
        yield model.save();
        const brand = new brandModel_1.default({ name: 'Test Brand' });
        yield brand.save();
        const client = new clientModel_1.default({ name: 'Test Client', email: 'test@example.com', phone: '123456789' });
        yield client.save();
        const vehicle = new vehicleModel_1.default({
            modelId: model._id,
            brandId: brand._id,
            year: 2020,
            clientId: client._id,
        });
        yield vehicle.save();
        const newService = {
            description: 'Test Service',
            serviceDate: new Date(),
            vehicleId: vehicle._id,
            clientId: client._id,
            status: 'Pendente',
            serviceValue: 100.0,
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(route)
            .send(newService);
        expect(response.status).toBe(201);
        expect(response.body._id).toBeDefined();
        expect(response.body.description).toBe('Test Service');
        yield serviceModel_1.default.findByIdAndDelete(response.body._id);
        yield vehicleModel_1.default.findByIdAndDelete(vehicle._id);
        yield modelModel_1.default.findByIdAndDelete(model._id);
        yield brandModel_1.default.findByIdAndDelete(brand._id);
        yield clientModel_1.default.findByIdAndDelete(client._id);
    }));
    it('GET /services - should return all services', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(route);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    }));
    it('GET /services/:id - should return a single service by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const model = new modelModel_1.default({ name: 'Test Model', brandId: new mongoose_1.default.Types.ObjectId() });
        yield model.save();
        const brand = new brandModel_1.default({ name: 'Test Brand' });
        yield brand.save();
        const client = new clientModel_1.default({ name: 'Test Client', email: 'test@example.com', phone: '123456789' });
        yield client.save();
        const vehicle = new vehicleModel_1.default({
            modelId: model._id,
            brandId: brand._id,
            year: 2020,
            clientId: client._id,
        });
        yield vehicle.save();
        const service = new serviceModel_1.default({
            description: 'Test Service',
            serviceDate: new Date(),
            vehicleId: vehicle._id,
            clientId: client._id,
            status: 'Pendente',
            serviceValue: 100.0,
        });
        yield service.save();
        const response = yield (0, supertest_1.default)(app_1.default).get(`${route}${service._id}`);
        expect(response.status).toBe(200);
        expect(response.body.description).toBe('Test Service');
        yield serviceModel_1.default.findByIdAndDelete(service._id);
        yield vehicleModel_1.default.findByIdAndDelete(vehicle._id);
        yield modelModel_1.default.findByIdAndDelete(model._id);
        yield brandModel_1.default.findByIdAndDelete(brand._id);
        yield clientModel_1.default.findByIdAndDelete(client._id);
    }));
    it('PUT /services/:id - should update a service by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const model = new modelModel_1.default({ name: 'Test Model', brandId: new mongoose_1.default.Types.ObjectId() });
        yield model.save();
        const brand = new brandModel_1.default({ name: 'Test Brand' });
        yield brand.save();
        const client = new clientModel_1.default({ name: 'Test Client', email: 'test@example.com', phone: '123456789' });
        yield client.save();
        const vehicle = new vehicleModel_1.default({
            modelId: model._id,
            brandId: brand._id,
            year: 2020,
            clientId: client._id,
        });
        yield vehicle.save();
        const service = new serviceModel_1.default({
            description: 'Test Service',
            serviceDate: new Date(),
            vehicleId: vehicle._id,
            clientId: client._id,
            status: 'Pendente',
            serviceValue: 100.0,
        });
        yield service.save();
        const updatedData = {
            description: 'Updated Test Service',
            serviceDate: new Date(),
            vehicleId: vehicle._id,
            clientId: client._id,
            status: 'Concluído',
            serviceValue: 150.0,
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`${route}${service._id}`)
            .send(updatedData);
        expect(response.status).toBe(200);
        expect(response.body.description).toBe('Updated Test Service');
        expect(response.body.status).toBe('Concluído');
        expect(response.body.serviceValue).toBe(150.0);
        yield serviceModel_1.default.findByIdAndDelete(service._id);
        yield vehicleModel_1.default.findByIdAndDelete(vehicle._id);
        yield modelModel_1.default.findByIdAndDelete(model._id);
        yield brandModel_1.default.findByIdAndDelete(brand._id);
        yield clientModel_1.default.findByIdAndDelete(client._id);
    }));
    it('DELETE /services/:id - should delete a service by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const model = new modelModel_1.default({ name: 'Test Model', brandId: new mongoose_1.default.Types.ObjectId() });
        yield model.save();
        const brand = new brandModel_1.default({ name: 'Test Brand' });
        yield brand.save();
        const client = new clientModel_1.default({ name: 'Test Client', email: 'test@example.com', phone: '123456789' });
        yield client.save();
        const vehicle = new vehicleModel_1.default({
            modelId: model._id,
            brandId: brand._id,
            year: 2020,
            clientId: client._id,
        });
        yield vehicle.save();
        const service = new serviceModel_1.default({
            description: 'Test Service',
            serviceDate: new Date(),
            vehicleId: vehicle._id,
            clientId: client._id,
            status: 'Pendente',
            serviceValue: 100.0,
        });
        yield service.save();
        const response = yield (0, supertest_1.default)(app_1.default).delete(`${route}${service._id}`);
        expect(response.status).toBe(200);
        yield vehicleModel_1.default.findByIdAndDelete(vehicle._id);
        yield modelModel_1.default.findByIdAndDelete(model._id);
        yield brandModel_1.default.findByIdAndDelete(brand._id);
        yield clientModel_1.default.findByIdAndDelete(client._id);
    }));
});
