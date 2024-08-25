"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('Testes da API de Serviços', () => {
    it('Deve criar um novo serviço', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/services')
            .send({
            description: 'Troca de óleo',
            serviceDate: '2024-08-18T10:00:00Z',
            vehicleId: '64d3c6062f4f6e6f1b021cb5',
            clientId: '64d3c6062f4f6e6f1b021cb6',
            status: 'Pendente',
            serviceValue: 150.00,
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });
});
