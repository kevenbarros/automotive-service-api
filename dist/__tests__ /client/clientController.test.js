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
const clientModel_1 = __importDefault(require("../../models/clientModel"));
const app_1 = __importDefault(require("../../app"));
let clientId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect('mongodb+srv://kevenbarros:keenbs07@cluster0.cb6fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    const randon = Math.floor(Math.random() * 10000);
    const newClient = new clientModel_1.default({
        name: 'Jane Doe' + randon,
        email: `${randon}teste@example.com`,
        phone: randon.toString(),
    });
    const savedClient = yield newClient.save();
    clientId = savedClient._id;
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield clientModel_1.default.findByIdAndDelete(clientId);
}));
describe('Client Controller', () => {
    const route = '/api/clients/';
    it('POST /clients - should create a new client', () => __awaiter(void 0, void 0, void 0, function* () {
        const randon = Math.floor(Math.random() * 10000);
        const newClient = {
            name: 'John Doe' + randon,
            email: `${randon}johndoe@example.com`,
            phone: randon.toString(),
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(route)
            .send(newClient);
        expect(response.status).toBe(201);
        expect(response.body._id).toBeDefined();
        expect(response.body.name).toBe(newClient.name);
        yield clientModel_1.default.findByIdAndDelete(response.body._id);
    }));
    it('GET /clients - should return all clients', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(route);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    }));
    it('GET /clients/:id - should return a single client by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(`${route}${clientId}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBeDefined();
    }));
    it('PUT /clients/:id - should update a client by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedData = { name: 'Markus Doe' };
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`${route}${clientId}`)
            .send(updatedData);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedData.name);
    }));
    it('DELETE /clients/:id - should delete a client by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).delete(`${route}${clientId}`);
        expect(response.status).toBe(204);
    }));
});
